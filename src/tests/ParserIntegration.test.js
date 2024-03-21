import {JavaTokenizer} from "../logic/lexers";
import {LocateClasses} from "../logic/parser";

// Fill out this array for more tests. Each element should be a structure with each of the following key-value pairs:
// name: The name of the test
// code: A string with all of the Java code
// expects: An array of class models that you expect the code to generate using the parser and lexer
let tests = [

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test empty class", 

    code: "class VerySimpleClass { }",

    expect:
      [
        {
          name: "VerySimpleClass",
          attributes: [],
          methods: [],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [],
          generics: [],
          constructors: []
        }
      ]

  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test class with just public static void main",

    code: 
      `
      class PublicStaticVoidMainStringArgs {
        public static void main(String[] args) {
          System.out.println("AAAAAAAAA");
        }
      }
      `,

    expect: 
      [
        {
          name: "PublicStaticVoidMainStringArgs",
          attributes: [],
          methods: [
            {
              name: "main",
              parameters: [
                {
                  name: "args",
                  value: "",
                  type: "String[]",
                  modifiers: []
                }
              ],
              return: "void",
              modifiers: [
                "public",
                "static"
              ],
              generics: []
            }
          ],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [],
          generics: [],
          constructors: []
        }
      ]

  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test class with public static undefined int attribute",

    code: 
      `
      class AttributeClass {
        public static int MyAttribute;
      }
      `,

    expect: 
      [
        {
          name: "AttributeClass",
          attributes: [
            {
              name: "MyAttribute",
              value: "",
              type: "int",
              modifiers: [
                "public",
                "static"
              ]
            }
          ],
          methods: [],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [],
          generics: [],
          constructors: []
        }
      ]

  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test class with private final defined short attribute",

    code: 
      `
      class AttributeClass {
        private final short MyAttribute = 5;
      }
      `,

    expect: 
      [
        {
          name: "AttributeClass",
          attributes: [
            {
              name: "MyAttribute",
              value: "5",
              type: "short",
              modifiers: [
                "private",
                "final"
              ]
            }
          ],
          methods: [],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [],
          generics: [],
          constructors: []
        }
      ]

  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test public class with constructor and modifierless attribute",

    code: 
      `
      public class ConstructorClass {
        double x;
        ConstructorClass(double x) {
          this.x = x;
        }
      }
      `,

    expect: 
      [
        {
          name: "ConstructorClass",
          attributes: [
            {
              name: "x",
              value: "",
              type: "double",
              modifiers: []
            }
          ],
          methods: [],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [
            "public"
          ],
          generics: [],
          constructors: [
            {
              name: "ConstructorClass",
              parameters: [
                {
                  name: "x",
                  value: "",
                  type: "double",
                  modifiers: []
                }
              ],
              return: "",
              modifiers: [],
              generics: []
            }
          ]
        }
      ]

  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test multiple attribute definitions",

    code: 
      `
      public class MultipleAttributeDefinitions {
        private static double x, y, z;
        public final int i = 2, j = 4, k = 0;
        short f, g, h;
      }
      `,

    expect: 
      [
        {
          name: "MultipleAttributeDefinitions",
          attributes: [
            {
              name: "x",
              value: "",
              type: "double",
              modifiers: [
                "private",
                "static"
              ]
            },
            {
              name: "y",
              value: "",
              type: "double",
              modifiers: [
                "private",
                "static"
              ]
            },
            {
              name: "z",
              value: "",
              type: "double",
              modifiers: [
                "private",
                "static"
              ]
            },
            {
              name: "i",
              value: "2",
              type: "int",
              modifiers: [
                "public",
                "final"
              ]
            },
            {
              name: "j",
              value: "4",
              type: "int",
              modifiers: [
                "public",
                "final"
              ]
            },
            {
              name: "k",
              value: "0",
              type: "int",
              modifiers: [
                "public",
                "final"
              ]
            },
            {
              name: "f",
              value: "",
              type: "short",
              modifiers: []
            },
            {
              name: "g",
              value: "",
              type: "short",
              modifiers: []
            },
            {
              name: "h",
              value: "",
              type: "short",
              modifiers: []
            },
          ],
          methods: [],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [
            "public"
          ],
          generics: [],
          constructors: []
        }
      ]

  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {

    name: "Test generics",

    code: 
      `
      class Generic<T> 
      { 
        static <T> void genericDisplay(T element)
        {
          System.out.println(element.getClass().getName()+ " = " + element);
        }
      }
      `,

    expect: 
      [
        {
          name: "Generic",
          attributes: [],
          methods: [
            {
              name: "genericDisplay",
              parameters: [
                {
                  name: "element",
                  value: "",
                  type: "T",
                  modifiers: []
                }
              ],
              return: "void",
              modifiers: [
                "static"
              ],
              generics: []
            }
          ],
          interface: false,
          extends: "",
          implements: [],
          modifiers: [],
          generics: [
            "T"
          ],
          constructors: []
        }
      ]

  }
];

tests.forEach(t => test(t.name, () => {
  const tokenizer = new JavaTokenizer(t.code);
  let tokens = [];
  let token = tokenizer.getNextToken();
  while (token !== null) {
      tokens.push(token);
      token = tokenizer.getNextToken();
  }
  let classes = LocateClasses(tokens);
  expect(classes).toStrictEqual(t.expect)
}));