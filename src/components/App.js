import './App.css';
//import { SelectJavaProjectDirectory } from '../logic/folderUtils';
import { Parsinator } from '../logic/parser.ts';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={Parsinator}>Open Project Directory</button>
      </header>
    </div>
  );
}

export default App;
