/*
import './App.css';
import { SelectJavaProjectDirectory } from '../logic/folderUtils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={SelectJavaProjectDirectory}>Open Project Directory</button>
      </header>
    </div>
  );
}

export default App;
*/

const { parse } = require("java-parser");
const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const cst = parse(javaText);