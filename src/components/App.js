import './App.css';
import { SelectFolderPath } from '../logic/folderUtils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={SelectFolderPath}>Open Project Directory</button>
      </header>
    </div>
  );
}

export default App;
