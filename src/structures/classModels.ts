// @ts-nocheck

export interface VariableModel {
    name: string,
    value: string,
    type: string,
    modifiers: string[]
}
/*
export const VariableModelDefaults: VariableModel = {
    name: "", 
    value: undefined, 
    type: "", 
    access: "private", 
    static: false, 
    final: false
}
*/

export interface MethodModel {
    name: string,
    parameters: VariableModel[],
    return: string,
    modifiers: string[],
    generics: string[]
}
/*
export const MethodModelDefaults: MethodModel = {
    name: "", 
    parameters: [],
    return: "",
    access: "private", 
    static: false, 
    final: false
}
*/

export interface ClassModel {
    name: string,
    attributes: VariableModel[],
    methods: MethodModel[],
    interface: boolean,
    extends: string,
    implements: string[],
    modifiers: string[],
    generics: string[]
}
/*
export const ClassModelDefaults: ClassModel = {
    name: "", 
    attributes: [],
    methods: [],
    abstract: false,
    interface: false,
    access: "public",
    extends: "",
    static: false,
    implements: []
}
*/

export interface AttributesAndMethods {
    attributes: VariableModel[],
    methods: MethodModel[]
}