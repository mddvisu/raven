var mahboi = ["public", "abstract", "class", "Main", "{", "public", "static", "int", "hi", "=", "24", ";", "public", "static", "void", "main", "(", "String", "[", "]", "args", ")", "{", "System", ".", "out", ".", "println", "(", '"', "mahboi, this peace is what all true warriors strive for!", '"', ")", ";", "}", "}"];

// An array of tokens that describe a method, class, or attribute
const descriptorTokens = ["public", "private", "protected", "abstract", "static"];


/**
 * Returns all of the tokens within a certian scope indicated by {}, [], (), "", '', or <>
 * 
 * @param {string[]} tokens - An array of tokens to look through
 * @param {number} startToken - The index of the token that indicates the beginning of the scope. The token at that
 * index must be {, [, (, ", ', or <
 * 
 * @returns {string[]} - An array of tokens within the scope
 */
export function GetTokensInScope(tokens: string[], startToken: number): string[] {
    let index: number = startToken + 1;
    let firstToken: string = tokens[startToken];
    let lastToken: string = "";
    switch (firstToken) {
        case "{":
            lastToken = "}";
            break;
        case "[":
            lastToken = "]";
            break;
        case "(":
            lastToken = ")";
            break;
        case '"':
            lastToken = '"';
            break;
        case "'":
            lastToken = "'";
            break;
        case "<":
            lastToken = ">";
            break;
        default:
            console.warn("Invalid starting token. The token at the specified starting index must be '{', '[', '(', '\"', ''', or '<'");
            return [];
    }
    let firstTokenCount = 0;
    while (index < tokens.length) {
        if (tokens[index] === firstToken) {
            firstTokenCount ++;
        } else if (tokens[index] === lastToken) {
            if (firstTokenCount > 0) {
                firstTokenCount --;
            } else {
                return tokens.slice(startToken + 1, index);
            }
        }
        index ++;
    }
    console.warn("Couldn't find the corresponding closing token in the tokens provided");
    return [];
}

/**
 * Returns an array of pairs. Index 0 of each pair contains an array of class descriptor tokens while index 1 has
 * an array of tokens within that class.
 * 
 * @param {string[]} tokens - An array of tokens to look through
 * 
 * @returns {string[]} - The object mentioned in the description
 */
export function LocateClasses(tokens: string[]): string[] {
    let classes = [];
    let index = 0;
    while (index < tokens.length) {
        if (tokens[index] === "class" || tokens[index] === "interface") {
            let classDescriptors = [];
            let backIndex = index - 1;
            while (backIndex >= 0 && descriptorTokens.includes(tokens[backIndex])) {
                classDescriptors.push(tokens[backIndex]);
                backIndex--;
            }
            while (index < tokens.length && tokens[index] !== "{") {
                classDescriptors.push(tokens[index]);
                index ++;
            }
            let tokensInClass = GetTokensInScope(tokens, index);
            index += tokensInClass.length + 2;
            classes.push([classDescriptors, tokensInClass]);
        } else {
            index ++;
        }
    }
    return classes;
}

/**
 * Returns an array of pairs. Index 0 of each pair contains an array of method/attribute descriptor tokens while index 1 has
 * an array of tokens within that method/attribute.
 * 
 * @param {string[]} tokens - An array of tokens to look through
 * 
 * @returns {string[]} - The object mentioned in the description
 */
 /*export function LocateMethodsAndAttributes(tokens: string[]): string[] {
    let methods = [];
    let attributes = [];
    let index = 0;

    while (index < tokens.length) {
        if (descriptorTokens.includes(tokens[index])) {

        }
    }
}*/

export function Parsinator() {
    console.log(LocateClasses(mahboi));
}

// GOAL:

/*
[
    "Main": {
        "attributes": [
            "hi": {
                "value": 24,
                "type": "int",
                "access": "public",
                "static": true
            }
        ],
        "methods": [
            "main": {
                "parameters": {
                    "args": {
                        "value": "undefined",
                        "type": "String[]"
                    }
                },
                "return": "void",
                "static": true,
                "access": "public"
            }
        ],
        "abstract": false,
        "interface": false,
        "access": "public"
    }
]
*/