import { VariableModel, MethodModel, ClassModel, AttributesAndMethods } from '../structures/classModels';
import { Token } from './lexers';

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
 * Searches through an array of tokens for classes, and returns them as an array of Class Models.
 *
 * @param {Token[]} tokens - An array of tokens to look through
 * 
 * @returns {ClassModel[]} - An array of Class Models
 */
export function LocateClasses(tokens: Token[]): ClassModel[] {

    let classes: ClassModel[] = [];

    let index = 0;
    while (index < tokens.length) {
        if (tokens[index].tokenType === "KEYWORD") {
            let descriptorsBeforeName = [];
            let descriptorsAfterName = [];
            
            while (index < tokens.length && tokens[index].value !== "class" && tokens[index].value !== "interface") {
                descriptorsBeforeName.push(tokens[index]);
                index ++;
            }

            descriptorsBeforeName.push(tokens[index]);
            index ++;
            descriptorsBeforeName.push(tokens[index]);
            index ++;

            while (index < tokens.length && tokens[index].value !== "{") {
                descriptorsAfterName.push(tokens[index]);
                index ++;
            }
            let tokensInClass = GetTokensInScope(tokens, index);
            
            index += tokensInClass.length + 2;
            classes.push(CreateClassModelFromTokens(descriptorsBeforeName, descriptorsAfterName, tokensInClass));
        } else {
            index ++;
        }
    }
    return classes;
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
        let descriptors: Token[] = [];
        let parameters: Token[] = [];
        // TODO: Filter out annotations
        while (index < tokens.length && tokens[index].tokenType === "KEYWORD") {
            descriptors.push(tokens[index]);
            index ++;
        }
        while (index < tokens.length && tokens[index].tokenType !== "KEYWORD") {
            descriptors.push(tokens[index]);
            console.log(tokens[index]);
            index ++;
        }
        if (index < tokens.length && tokens[index].value === "=") {
            index ++;
            parameters = [];
            while (index < tokens.length && tokens[index].value !== ";") {
                parameters.push(tokens[index]);
                index ++;
            }
            ret.attributes.push(CreateVariableModelFromTokens(descriptors, parameters));
        }
        else if (index < tokens.length && tokens[index].value === "(") {
            parameters = GetTokensInScope(tokens, index);
            index += parameters.length + 2;
            while (index < tokens.length && tokens[index].value !== "{") {
                index ++;
            }
            let content = GetTokensInScope(tokens, index);
            index += content.length + 2;
            ret.methods.push(CreateMethodModelFromTokens(descriptors, parameters));
        }
        else if (index < tokens.length && tokens[index].value === ";") {
            ret.attributes.push(CreateVariableModelFromTokens(descriptors, []));
        }
        index ++;
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
    for (const token of descriptorTokens) {
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
        }
    }
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
    console.log(descriptorTokens);
    let model: MethodModel = {name: "", parameters: [], return: "", access: "private", static: false, final: false};
    for (const token of descriptorTokens) {
        switch (token.value) {
            case ("public" || "private"|| "protected"):
                model.access = token.value;
                break;
            case ("static"):
                model.static = true;
                break;
            case ("final"):
                model.final = true;
                break;
        }
    }
    // TODO: Figure out if this breaks in any scenario
    if (!descriptorTokens.includes(descriptorTokens[descriptorTokens.length - 2])) {
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
    for (const token of descriptorTokensBeforeName) {
        switch (token.value) {
            case ("public" || "private" || "protected"):
                model.access = token.value;
                break;
            case ("static"):
                model.static = true;
                break;
            case ("abstract"):
                model.abstract = true;
                break;
            case ("interface"):
                model.interface = true;
                break;
        }
    }
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