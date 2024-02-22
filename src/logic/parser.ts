import { VariableModel, MethodModel, ClassModel, AttributesAndMethods } from '../structures/classModels';
import { Token } from './lexers';

const ATTRIBUTE_AND_METHOD_MODIFIER_END_SYMBOLS = "(=;";


/**
 * Returns all of the tokens within a certian scope indicated by {}, [], (), "", '', or <>
 *
 * @param {Token[]} tokens - An array of tokens to look through
 * @param {number} startToken - The index of the token that indicates the beginning of the scope. The token at that
 * index must be {, [, (, ", ', or <
 * 
 * @returns {Token[]} - An array of tokens within the scope
 */
export function GetTokensInScope(tokens: Token[], startToken: number): Token[] {
    let index: number = startToken + 1;
    let firstToken: string = tokens[startToken].value;
    let lastToken: string = "";
    // Figure out the closing bracket token that corresponds to the opening bracket token
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
    // Reads through each token after the starting index, and counts the nummber of times it runs into the opening bracket.
    // Each time it runs into a closing bracket, decrement this count by 1 unless the count is 0, in which case we know that 
    // is the closing bracket to the opening bracket we started from.
    let firstTokenCount = 0;
    while (index < tokens.length) {
        if (tokens[index].value === firstToken) {
            firstTokenCount ++;
        } else if (tokens[index].value === lastToken) {
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
 * Sets modifiers on a class, method, or variable model from its modifier tokens
 *
 * @param {Token[]} tokens - An array of tokens to look through
 * @param {any} model - A reference to a data model to set the values of
 */
export function SetModifiersOfModel(modifierTokens: Token[], model: any) {
    // Error handling for the "any" type
    try {
        for (const token of modifierTokens) {
            switch (token.value) {
                case ("public" || "private" || "protected"):
                    model.access = token.value;
                    break;
                case ("static"):
                    model.static = true;
                    break;
                case ("final"):
                    model.final = true;
                    break;
                case ("abstract"):
                    model.abstract = true;
                    break;
                case ("interface"):
                    model.interface = true;
                    break;
            }
        }
    } catch (e) {}
}

// Comprehensive list of all modifiers that can be used with an outer class
const CLASS_MODIFIERS = ["public", "abstract", "final"];
function IsClassModifier(token) {
    return CLASS_MODIFIERS.includes(token.value);
}
function IsClassKeyword(token) {
    return token.value === "class" || token.value === "interface";
}
function SkipAnnotation(tokens, index) {
    if (index < tokens.length) index ++;
    if (tokens[index].value === "interface") {
        while (index < tokens.length && tokens[index].value !== "{") index ++;
        if (index >= tokens.length) {
            console.warn("A syntax error was found in the code. Check that your annotation definitions are correct");
            return [];
        }
        index += GetTokensInScope(tokens, index).length + 2;
    } else {
        if (index < tokens.length) index ++;
        if (tokens[index].value === "(") index += GetTokensInScope(tokens, index).length + 2;
        console.log(tokens[index]);
    }
    return index;
}

/**
 * Searches through an array of tokens for classes, and returns them as an array of Class Models.
 *
 * @param {Token[]} tokens - An array of tokens to look through
 * 
 * @returns {ClassModel[]} - An array of Class Models
 */
export function LocateClasses(tokens: Token[]): ClassModel[] {
    // Read through each token until you get to a keyword
    let classes: ClassModel[] = [];
    let index = 0;
    while (index < tokens.length) {
        // Skip over any annotations
        if (tokens[index].value === "@") {
            index = SkipAnnotation(tokens, index);
        }
        // If we run into a class modifier, or the class or interface keywords, this is a class definition, and we should start gathering the symbols
        else if (IsClassModifier(tokens[index]) || IsClassKeyword(tokens[index])) {
            let keywordsBeforeName = [];
            let tokensAfterName = [];
            while (index < tokens.length && IsClassModifier(tokens[index])) {
                keywordsBeforeName.push(tokens[index]);
                index ++;
            }
            // If the syntax is correct, the next two tokens should be the class keyword and class name respectively
            if (!(index >= tokens.length - 2) && IsClassKeyword(tokens[index])) {
                keywordsBeforeName.push(tokens[index]);
                index ++;
                keywordsBeforeName.push(tokens[index]);
                index ++;
            } else {
                console.warn("A syntax error was found in the code. Check that your class definitions are correct");
                return [];
            }
            // Gather all remaining tokens up to the opening curly brace
            while (index < tokens.length && tokens[index].value !== "{") {
                tokensAfterName.push(tokens[index]);
                index ++;
                if (index >= tokens.length) {
                    console.warn("A syntax error was found in the code. Check that your class definitions are correct");
                    return [];
                }
            }
            // Gather all tokens within the curly braces
            let tokensInClass = GetTokensInScope(tokens, index);
            // Create the class model from the tokens gathered
            classes.push(CreateClassModelFromTokens(keywordsBeforeName, tokensAfterName, tokensInClass));
            // Update the index to start after the class content to continue parsing through the rest of the code
            index += tokensInClass.length + 2;
        } else {
            index ++;
        }
    }
    return classes;
}

const ATTRIBUTE_AND_METHOD_MODIFIERS = ["public", "private", "protected", "final", "abstract", "static", "transient", "synchronized", "volatile"];
function IsAttributeOrMethodModifier(token) {
    return ATTRIBUTE_AND_METHOD_MODIFIERS.includes(token.value);
}

/**
 * Looks through an array of tokens for attributes and methods, and returns a structure containing an array of Variable Models (attributes)
 * and an array of Method Models (methods) based on the attributes and methods found.
 * 
 * @param {Token[]} tokens - An array of tokens to look through
 * 
 * @returns {AttributesAndMethods} - A data structure containing arrays of Variable and Method Models.
 */
export function LocateMethodsAndAttributes(tokens: Token[]): AttributesAndMethods {
    let ret: AttributesAndMethods = {
        attributes: [],
        methods: []
    }
    let index = 0;
    while (index < tokens.length) {
        let modifiers: Token[] = [];
        let parameters: Token[] = [];
        if (tokens[index].value === "@") {
            index = SkipAnnotation(tokens, index);
        } else if (IsAttributeOrMethodModifier(tokens[index]) || tokens[index].tokenType === "KEYWORD") {
            while (index < tokens.length && IsAttributeOrMethodModifier(tokens[index])) {
                modifiers.push(tokens[index]);
                index ++;
            }
            // If the syntax is correct, the next two tokens should be the type and name respectively
            while (index < tokens.length && !ATTRIBUTE_AND_METHOD_MODIFIER_END_SYMBOLS.includes(tokens[index].value)) {
                modifiers.push(tokens[index]);
                index ++;
            } 
            if (index >= tokens.length) {
                console.warn("A syntax error was found in the code. Check that your method and attribute definitions are correct");
                return {attributes: [], methods: []};
            }
            // Equal sign after modifiers means that this is a defined attribute
            if (tokens[index].value === "=") {
                index ++;
                parameters = [];
                while (index < tokens.length && tokens[index].value !== ";") {
                    parameters.push(tokens[index]);
                    index ++;
                }
                ret.attributes.push(CreateVariableModelFromTokens(modifiers, parameters));
            }
            // Opening parinthese after modifiers means that this is a method
            else if (tokens[index].value === "(") {
                parameters = GetTokensInScope(tokens, index);
                index += parameters.length + 2;
                while (index < tokens.length && tokens[index].value !== "{") {
                    index ++;
                }
                let content = GetTokensInScope(tokens, index);
                index += content.length + 2;
                ret.methods.push(CreateMethodModelFromTokens(modifiers, parameters));
            }
            // Semicolon after modifiers means that this is an undefined attribute
            else if (tokens[index].value === ";") {
                ret.attributes.push(CreateVariableModelFromTokens(modifiers, []));
            }
        } else {
            index ++;
        }
    }
    return ret;
}

/**
 * Looks through tokens that represent a variable definition and creates a Variabe Model from them.
 * 
 * @param {Token[]} descriptorTokens - An array of tokens that make up the definition of the variable
 * @param {Token[]} valueTokens - An array of tokens that make up the value of the variable
 * 
 * @returns {VariableModel} - The variable model created
 */
export function CreateVariableModelFromTokens(descriptorTokens: Token[], valueTokens: Token[]): VariableModel {
    let model: VariableModel = {name: "", value: undefined, type: "", access: "private", static: false, final: false};
    SetModifiersOfModel(descriptorTokens, model);
    // TODO: Figure out if this breaks in any scenario
    model.type = descriptorTokens[descriptorTokens.length - 2].value;
    model.name = descriptorTokens[descriptorTokens.length - 1].value;
    // TODO: Parse value tokens
    return model;
}

/**
 * Looks through tokens that represent a method definition and creates a Method Model from them.
 * 
 * @param {Token[]} descriptorTokens - An array of tokens that make up the definition of the method
 * @param {Token[]} parameterTokens - An array of tokens that make up the parameters of the method (between the parintheses)
 * 
 * @returns {MethodModel} - The method model created
 */
export function CreateMethodModelFromTokens(descriptorTokens: Token[], parameterTokens: Token[]): MethodModel {
    let model: MethodModel = {name: "", parameters: [], return: "", access: "private", static: false, final: false};
    SetModifiersOfModel(descriptorTokens, model);
    // TODO: Figure out if this breaks in any scenario
    if (descriptorTokens[descriptorTokens.length - 2] && !(descriptorTokens[descriptorTokens.length - 2].tokenType === "KEYWORD")) {
        model.return = descriptorTokens[descriptorTokens.length - 2].value;
    }
    model.name = descriptorTokens[descriptorTokens.length - 1].value;
    // TODO: Parse parameter tokens
    return model;
}

/**
 * Looks through tokens that represent a class definition and creates a Class Model from them.
 * 
 * @param {Token[]} descriptorTokensBeforeName - An array of tokens that appear before (or at) the class name
 * @param {Token[]} descriptorTokensAfterName - An array of tokens that appear after the class name
 * @param {Token[]} contentTokens - An array of tokens that hold the content of the class
 * 
 * @returns {ClassModel} - The class model created
 */
export function CreateClassModelFromTokens(descriptorTokensBeforeName: Token[], descriptorTokensAfterName: Token[], contentTokens: Token[]): ClassModel {
    let model: ClassModel = {name: "", attributes: [], methods: [], abstract: false, interface: false, access: "public", extends: "", static: false, implements: []};
    SetModifiersOfModel([...descriptorTokensBeforeName, ...descriptorTokensAfterName], model);
    // TODO: Figure out if this breaks in any scenario
    model.name = descriptorTokensBeforeName[descriptorTokensBeforeName.length - 1].value;

    let index = 0;
    while (index < descriptorTokensAfterName.length) {
        let token = descriptorTokensAfterName[index];
        if (token.value === "extends") {
            index ++;
            model.extends = descriptorTokensAfterName[index].value;
        } else if (token.value === "implements") {
            index ++;
            model.implements = [descriptorTokensAfterName[index].value];
            index ++;
            while (index < descriptorTokensAfterName.length && descriptorTokensAfterName[index].value !== ",") {
                index ++;
                model.implements.push(descriptorTokensAfterName[index].value)
                index ++;
            }
        }
        index ++;
    }
    let attributesAndMethods = LocateMethodsAndAttributes(contentTokens);
    model.attributes = attributesAndMethods.attributes;
    model.methods = attributesAndMethods.methods;
    return model;
}