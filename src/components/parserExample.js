
const { parse } = require("java-parser");
const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const cst = parse(javaText);

console.log(cst);