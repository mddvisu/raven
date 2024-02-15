const { JavaTokenizer } = require('../logic/lexers.ts');

describe('JavaTokenizer', () => {
    it('should tokenize Java code', () => {
        const javaCode = `
        public class HelloWorld {
        public static void main(String[] args) {
        System.out.println("Hello, 5th World!");
        // I am a comment
        int num = 50/2;
    }
    }
    `;

        const tokenizer = new JavaTokenizer(javaCode);
        const tokens = [];
        let token = tokenizer.getNextToken();

        while (token !== null) {
            tokens.push({ type: token.type, value: token.value });
            token = tokenizer.getNextToken();
        }


        expect(tokens).toEqual([
            { type: 'IDENTIFIER', value: 'public' },
            { type: 'IDENTIFIER', value: 'class' },
            { type: 'IDENTIFIER', value: 'HelloWorld' },
            { type: 'Curly Brace', value: '{' },
            { type: 'IDENTIFIER', value: 'public' },
            { type: 'IDENTIFIER', value: 'static' },
            { type: 'IDENTIFIER', value: 'void' },
            { type: 'IDENTIFIER', value: 'main' },
            { type: 'OTHER', value: '(' },
            { type: 'IDENTIFIER', value: 'String' },
            { type: 'OTHER', value: '[' },
            { type: 'OTHER', value: ']' },
            { type: 'IDENTIFIER', value: 'args' },
            { type: 'OTHER', value: ')' },
            { type: 'Curly Brace', value: '{' },
            { type: 'IDENTIFIER', value: 'System' },
            { type: 'OTHER', value: '.' },
            { type: 'IDENTIFIER', value: 'out' },
            { type: 'OTHER', value: '.' },
            { type: 'IDENTIFIER', value: 'println' },
            { type: 'OTHER', value: '(' },
            { type: 'Quotes', value: '"' },
            { type: 'String', value: 'Hello, 5th World!' },
            { type: 'Quotes', value: '"' },
            { type: 'OTHER', value: ')' },
            { type: 'OTHER', value: ';' },
            { type: 'COMMENT', value: '// I am a comment' },
            { type: 'IDENTIFIER', value: 'int' },
            { type: 'IDENTIFIER', value: 'num' },
            { type: 'OPERATOR', value: '=' },
            { type: 'NUMBER', value: '50' },
            { type: 'OPERATOR', value: '/' },
            { type: 'NUMBER', value: '2' },
            { type: 'OTHER', value: ';' },
            { type: 'Curly Brace', value: '}' },
            { type: 'Curly Brace', value: '}' },
        ]);
    });
});
