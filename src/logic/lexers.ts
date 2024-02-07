class Token {
    constructor(public type: string, public value: string | null) { }
}

class JavaTokenizer {
    private code: string;
    private index: number = 0;

    constructor(code: string) {
        this.code = code;
    }

    private isWhitespace(char: string): boolean {
        return /\s/.test(char);
    }

    private isDigit(char: string): boolean {
        return /\d/.test(char);
    }

    private isLetter(char: string): boolean {
        return /[a-zA-Z]/.test(char);
    }

    private isIdentifierStart(char: string): boolean {
        return this.isLetter(char) || char === '_';
    }

    private isOperator(char: string): boolean {
        return /[+\-*/=<>!&|]/.test(char);
    }

    private isQuote(char: string): boolean {
        return char === '"' || char === "'";
    }

    private isCurlyBrace(char: string): boolean {
        return /[{}]/.test(char);
    }

    private readWhile(predicate: (char: string) => boolean): string {
        let result = '';
        while (this.code[this.index] !== undefined && predicate(this.code[this.index])) {
            result += this.code[this.index];
            this.index++;
        }
        return result;
    }

    private readIdentifier(): Token {
        if ((this.code[this.index - 1] == '"') || (this.code[this.index - 1] == "'")) {
            const quote = this.code[this.index - 1];
            const value = this.readWhile((char) => char !== quote);
            return new Token('String', value);
        }
        const value = this.readWhile((char) => this.isIdentifierStart(char) || this.isDigit(char));
        return new Token('IDENTIFIER', value);
    }

    private readNumber(): Token {
        const value = this.readWhile((char) => this.isDigit(char));
        return new Token('NUMBER', value);
    }

    private readString(): Token {
        if ((this.code[this.index] == '"') || (this.code[this.index] == "'")) {
            const value = this.readWhile((char) => this.isQuote(char));
            return new Token('Quotes', value);
        }
    }
    private readOperator(): Token {
        const value = this.readWhile((char) => this.isOperator(char));
        return new Token('OPERATOR', value);
    }

    private readCurlyBrace(): Token {
        const value = this.readWhile((char) => this.isCurlyBrace(char));
        return new Token('Curly Brace', value);
    }

    private readOther(): Token {
        const value = this.code[this.index];
        this.index++;
        return new Token('OTHER', value);
    }

    private skipWhitespace(): void {
        this.readWhile((char) => this.isWhitespace(char));
    }

    getNextToken(): Token | null {
        this.skipWhitespace();
        if (this.code[this.index] === undefined) {
            return null; // End of input
        }

        const char = this.code[this.index];

        if (this.isIdentifierStart(char)) {
            return this.readIdentifier();
        }

        if (this.isDigit(char)) {
            return this.readNumber();
        }

        if (this.isQuote(char)) {
            return this.readString();
        }

        if (this.isOperator(char)) {
            return this.readOperator();
        }

        if (this.isCurlyBrace(char)) {
            return this.readCurlyBrace();
        }

        // If none of the above, treat it as a single character token
        return this.readOther();
    }
}

//------ Test example java code

const javaCode = `
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, 5th World!");
    int num = 50+2;
  }
}
`;

const tokenizer = new JavaTokenizer(javaCode);
let token = tokenizer.getNextToken();
while (token !== null) {
    console.log(token.value);
    token = tokenizer.getNextToken();
}
