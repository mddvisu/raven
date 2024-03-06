// Define a Token class to represent the different types of tokens
export class Token {
    constructor(public type: string, public value: string | null) { }
}

// Define a list of keywords in the Java language
const KEYWORDS = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "continue", "default", "do", "double", "else", "enum", "extends", "final", "finally", "float", "for", "if", "implements", "import", "instanceof", "int", "interface", "long", "new", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "this", "throw", "throws", "try", "void", "while"];
// Create a class for tokenizing Java code
export class JavaTokenizer {

    private code: string;
    private index: number = 0;
    private lastToken: Token | null = null;

    // Constructor to initialize the JavaTokenizer with code
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

    private isCommentStart(char: string): boolean {
        return char === '/' && this.code[this.index + 1] === '/';
    }

    private isMultiLineCommentStart(char: string): boolean {
        return char === '/' && this.code[this.index + 1] === '*';
    }

    private isString(): boolean {
        return this.lastToken && this.lastToken.type == "QUOTES";
    }

    private readCurrent() {
        let result = this.code[this.index];
        this.index++;
        return result;
    }

    // Function to read characters from the current position while a predicate is true
    private readWhile(predicate: (char: string) => boolean): string {
        let result = '';
        // Continue looping while there are characters remaining in the code, and the predicate is true
        while (this.code[this.index] !== undefined && predicate(this.code[this.index])) {
            result += this.readCurrent();
        }
        return result;
    }

    private readIdentifier(): Token {
        const value = this.readWhile((char) => this.isIdentifierStart(char) || this.isDigit(char));
        const type = KEYWORDS.includes(value) ? 'KEYWORD' : 'IDENTIFIER';
        this.lastToken = new Token(type, value);
        return new Token(type, value);
    }

    private readNumber(): Token {
        const value = this.readWhile((char) => this.isDigit(char) || char === ".");
        this.lastToken = new Token('NUMBER', value);
        return new Token('NUMBER', value);
    }

    private readQuote(): Token {
        // Quotes are only 1 character, so don't want to treat multiple quotes next to it as the same token
        const value = this.readCurrent();
        let tokenType = this.lastToken.type === "STRING" ? 'ENDQUOTES' : 'QUOTES';
        this.lastToken = new Token(tokenType, value);
        return new Token(tokenType, value);
    }

    private readOperator(): Token {
        const value = this.readWhile((char) => this.isOperator(char));
        this.lastToken = new Token('OPERATOR', value);
        return new Token('OPERATOR', value);
    }

    private readCurlyBrace(): Token {
        const value = this.readWhile((char) => this.isCurlyBrace(char));
        this.lastToken = new Token('CURLY_BRACE', value);
        return new Token('CURLY_BRACE', value);
    }

    private readSingleLineComment(): Token {
        const value = this.readWhile((char) => char !== '\n' && char !== '\r');
        this.lastToken = new Token('COMMENT', value);
        return new Token('COMMENT', value);
    }

    private readMultiLineComment(): Token {
        let value = '';
        while (this.code[this.index] !== undefined) {
            const char = this.getNextChar();
            if (char === '*' && this.code[this.index] === '/') {
                this.index++;
                break;
            }
            value += char;
        }
        this.lastToken = new Token('COMMENT', value);
        return new Token('COMMENT', value);
    }

    private readOther(): Token {
        const value = this.code[this.index];
        this.index++;
        this.lastToken = new Token('OTHER', value);
        return new Token('OTHER', value);
    }

    private readString(): Token {
        const quote = this.lastToken.value;
        const value = this.readWhile((char) => char !== quote);
        this.lastToken = new Token('STRING', value);
        return new Token('STRING', value);
    }

    private skipWhitespace(): void {
        this.readWhile((char) => this.isWhitespace(char));
    }

    private getNextChar(): string {
        return this.code[this.index++];
    }

    getNextToken(): Token | null {

        if (!this.isString()) {
            this.skipWhitespace();
        }

        if (this.code[this.index] === undefined) {
            return null; // End of input
        }

        const char = this.code[this.index];

        if (this.isString()) {
            return this.readString();
        }

        if (this.isIdentifierStart(char)) {
            return this.readIdentifier();
        }

        if (this.isDigit(char)) {
            return this.readNumber();
        }

        if (this.isQuote(char)) {
            return this.readQuote();
        }

        if (this.isCurlyBrace(char)) {
            return this.readCurlyBrace();
        }

        if (this.isCommentStart(char)) {
            return this.readSingleLineComment();
        }

        if (this.isMultiLineCommentStart(char)) {
            this.index += 2; // Skip '/*'
            return this.readMultiLineComment();
        }
        //moved so comments come first
        if (this.isOperator(char)) {
            return this.readOperator();
        }

        // If none of the above, treat it as a single character token
        return this.readOther();
    }
}

//------ Test example java code
/*
const javaCode = `
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, 5th World!");
    // I am a comment
    int num = 50/2;
  }
  I am multiple lines >2 
  but also a comment}`;


const tokenizer = new JavaTokenizer(javaCode);
let token = tokenizer.getNextToken();
while (token !== null) {
    console.log(token);
    token = tokenizer.getNextToken();
}
*/
