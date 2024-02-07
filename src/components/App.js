
import './App.css';
import { SelectJavaProjectDirectory } from '../logic/folderUtils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={SelectJavaProjectDirectory}>Open Project Directory</button>
      </header>
      <body>
      </body>
    </div>
  );
}

export default App;