var Token = /** @class */ (function () {
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    return Token;
}());
var JavaTokenizer = /** @class */ (function () {
    function JavaTokenizer(code) {
        this.index = 0;
        this.code = code;
    }
    JavaTokenizer.prototype.isWhitespace = function (char) {
        return /\s/.test(char);
    };
    JavaTokenizer.prototype.isDigit = function (char) {
        return /\d/.test(char);
    };
    JavaTokenizer.prototype.isLetter = function (char) {
        return /[a-zA-Z]/.test(char);
    };
    JavaTokenizer.prototype.isIdentifierStart = function (char) {
        return this.isLetter(char) || char === '_';
    };
    JavaTokenizer.prototype.isOperator = function (char) {
        return /[+\-*/=<>!&|]/.test(char);
    };
    JavaTokenizer.prototype.readWhile = function (predicate) {
        var result = '';
        while (this.code[this.index] !== undefined && predicate(this.code[this.index])) {
            result += this.code[this.index];
            this.index++;
        }
        return result;
    };
    JavaTokenizer.prototype.readIdentifier = function () {
        var _this = this;
        var value = this.readWhile(function (char) { return _this.isIdentifierStart(char) || _this.isDigit(char); });
        return new Token('IDENTIFIER', value);
    };
    JavaTokenizer.prototype.readNumber = function () {
        var _this = this;
        var value = this.readWhile(function (char) { return _this.isDigit(char); });
        return new Token('NUMBER', value);
    };
    JavaTokenizer.prototype.readString = function () {
        this.index++; // Skip the opening quote
        var value = this.readWhile(function (char) { return char !== '"'; });
        this.index++; // Skip the closing quote
        return new Token('STRING', value);
    };
    JavaTokenizer.prototype.readOperator = function () {
        var _this = this;
        var value = this.readWhile(function (char) { return _this.isOperator(char); });
        return new Token('OPERATOR', value);
    };
    JavaTokenizer.prototype.skipWhitespace = function () {
        var _this = this;
        this.readWhile(function (char) { return _this.isWhitespace(char); });
    };
    JavaTokenizer.prototype.getNextToken = function () {
        this.skipWhitespace();
        if (this.code[this.index] === undefined) {
            return null; // End of input
        }
        var char = this.code[this.index];
        if (this.isIdentifierStart(char)) {
            return this.readIdentifier();
        }
        if (this.isDigit(char)) {
            return this.readNumber();
        }
        if (char === '"') {
            return this.readString();
        }
        if (this.isOperator(char)) {
            return this.readOperator();
        }
        // If none of the above, treat it as a single character token
        var value = this.code[this.index];
        this.index++;
        return new Token('OTHER', value);
    };
    return JavaTokenizer;
}());
// Example usage
var javaCode = "\npublic class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}\n";
var tokenizer = new JavaTokenizer(javaCode);
var token = tokenizer.getNextToken();
while (token !== null) {
    console.log(token);
    token = tokenizer.getNextToken();
}
