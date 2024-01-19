import './App.css';
import { os } from "@neutralinojs/lib"

function OpenDialog() {
  let projectDir = os.showFolderDialog('Open a project directory', {});
  console.log(projectDir);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={OpenDialog}>Open Project Directory</button>
      </header>
    </div>
  );
}

export default App;
