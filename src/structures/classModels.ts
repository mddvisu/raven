// @ts-nocheck

export interface VariableModel {
    name: string,
    value: any,
    type: string,
    access: string,
    static: boolean,
    final: boolean
}

export const VariableModelDefaults: VariableModel = {
    name: "", 
    value: undefined, 
    type: "", 
    access: "private", 
    static: false, 
    final: false
}


export interface MethodModel {
    name: string,
    parameters: VariableModel[],
    return: string,
    static: boolean,
    access: string,
    final: boolean
}

export const MethodModelDefaults: MethodModel = {
    name: "", 
    parameters: [],
    return: "",
    access: "private", 
    static: false, 
    final: false
}


export interface ClassModel {
    name: string,
    attributes: VariableModel[],
    methods: MethodModel[],
    abstract: boolean,
    interface: boolean,
    access: string,
    extends: string,
    static: boolean,
    implements: string[]
}

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


export interface AttributesAndMethods {
    attributes: VariableModel[],
    methods: MethodModel[]
}