// @ts-nocheck

import { VariableModel, MethodModel, ClassModel, AttributesAndMethods } from '../structures/classModels';

// An array of tokens that describe a method, class, or attribute
const descriptorTokens = ["public", "private", "protected", "abstract", "static", "final", "extends", "implements", "class", "interface"];

const symbols = "{}[]()<>=;+-/?:,.\"|*&^%$#@!~`";

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
 * Searches through an array of tokens for classes, and returns them as an array of Class Models.
 *
 * @param {string[]} tokens - An array of tokens to look through
 * 
 * @returns {string[]} - An array of Class Models
 */
export function LocateClasses(tokens: string[]): ClassModel[] {

    let classes: ClassModel[] = [];

    let index = 0;
    while (index < tokens.length) {
        if (descriptorTokens.includes(tokens[index])) {
            let descriptorsBeforeName = [];
            let descriptorsAfterName = [];
            
            while (tokens[index] !== "class" && tokens[index] !== "interface") {
                descriptorsBeforeName.push(tokens[index]);
                index ++;
            }

            descriptorsBeforeName.push(tokens[index]);
            index ++;
            descriptorsBeforeName.push(tokens[index]);
            index ++;

            while (tokens[index] !== "{") {
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
 * @param {string[]} tokens - An array of tokens to look through
 * 
 * @returns {AttributesAndMethods} - A data structure containing arrays of Variable and Method Models.
 */
export function LocateMethodsAndAttributes(tokens: string[]): AttributesAndMethods {
    let ret: AttributesAndMethods = {
        attributes: [],
        methods: []
    }
    let index = 0;
    while (index < tokens.length) {
        let descriptors: string[] = [];
        let parameters: string[] = [];
        // TODO: Filter out annotations
        while (descriptorTokens.includes(tokens[index])) {
            descriptors.push(tokens[index]);
            index ++;
        }
        while (!symbols.includes(tokens[index])) {
            descriptors.push(tokens[index]);
            index ++;
        }
        if (tokens[index] === "=") {
            index ++;
            parameters = [];
            while (tokens[index] !== ";") {
                parameters.push(tokens[index]);
                index ++;
            }
            ret.attributes.push(CreateVariableModelFromTokens(descriptors, parameters));
        }
        else if (tokens[index] === "(") {
            parameters = GetTokensInScope(tokens, index);
            index += parameters.length + 2;
            while (tokens[index] !== "{") {
                index ++;
            }
            let content = GetTokensInScope(tokens, index);
            index += content.length + 2;
            ret.methods.push(CreateMethodModelFromTokens(descriptors, parameters));
        }
        else if (tokens[index] === ";") {
            ret.attributes.push(CreateVariableModelFromTokens(descriptors, []));
        }
        index ++;
    }
    return ret;
}

/**
 * Looks through tokens that represent a variable definition and creates a Variabe Model from them.
 * 
 * @param {string[]} descriptorTokens - An array of tokens that make up the definition of the variable
 * @param {string[]} valueTokens - An array of tokens that make up the value of the variable
 * 
 * @returns {VariableModel} - The variable model created
 */
export function CreateVariableModelFromTokens(descriptorTokens: string[], valueTokens: string[]): VariableModel {
    let model: VariableModel = {name: "", value: undefined, type: "", access: "private", static: false, final: false};
    for (const token of descriptorTokens) {
        switch (token) {
            case ("public" || "private" || "protected"):
                model.access = token;
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
    model.type = descriptorTokens[descriptorTokens.length - 2];
    model.name = descriptorTokens[descriptorTokens.length - 1];
    // TODO: Parse value tokens
    return model;
}

/**
 * Looks through tokens that represent a method definition and creates a Method Model from them.
 * 
 * @param {string[]} descriptorTokens - An array of tokens that make up the definition of the method
 * @param {string[]} parameterTokens - An array of tokens that make up the parameters of the method (between the parintheses)
 * 
 * @returns {MethodModel} - The method model created
 */
export function CreateMethodModelFromTokens(descriptorTokens: string[], parameterTokens: string[]): MethodModel {
    let model: MethodModel = {name: "", parameters: [], return: "", access: "private", static: false, final: false};
    for (const token of descriptorTokens) {
        switch (token) {
            case ("public" || "private"|| "protected"):
                model.access = token;
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
        model.return = descriptorTokens[descriptorTokens.length - 2];
    }
    model.name = descriptorTokens[descriptorTokens.length - 1];
    // TODO: Parse parameter tokens
    return model;
}

/**
 * Looks through tokens that represent a class definition and creates a Class Model from them.
 * 
 * @param {string[]} descriptorTokensBeforeName - An array of tokens that appear before (or at) the class name
 * @param {string[]} descriptorTokensAfterName - An array of tokens that appear after the class name
 * @param {string[]} contentTokens - An array of tokens that hold the content of the class
 * 
 * @returns {ClassModel} - The class model created
 */
export function CreateClassModelFromTokens(descriptorTokensBeforeName: string[], descriptorTokensAfterName: string[], contentTokens: string[]): ClassModel {
    let model: ClassModel = {name: "", attributes: [], methods: [], abstract: false, interface: false, access: "public", extends: "", static: false, implements: []};
    for (const token of descriptorTokensBeforeName) {
        switch (token) {
            case ("public" || "private" || "protected"):
                model.access = token;
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
    model.name = descriptorTokensBeforeName[descriptorTokensBeforeName.length - 1];

    let index = 0;
    while (index < descriptorTokensAfterName.length) {
        let token = descriptorTokensAfterName[index];
        if (token === "extends") {
            index ++;
            model.extends = descriptorTokensAfterName[index];
        } else if (token === "implements") {
            index ++;
            model.implements = [descriptorTokensAfterName[index]];
            index ++;
            while (index < descriptorTokensAfterName.length && descriptorTokensAfterName[index] !== ",") {
                index ++;
                model.implements.push(descriptorTokensAfterName[index])
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