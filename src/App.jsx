// import '../src/components/App.css';
// import { SelectFolderPath } from '../src/logic/folderUtils';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={SelectFolderPath}>Open Project Directory</button>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Welcome, Home } from '../src/pages';
const Neutralino = require(Neutralino);

const App = () => {
  useEffect(() => {
    // Initialize Neutralino with the desired window position
    Neutralino.init({
      window: {
        setPosition: {
          x: (window.screen.width - window.innerWidth) / 2,
          y: (window.screen.height - window.innerHeight) / 2
        }
      }
    });
  }, []); // Run only once when the component mounts

  return (
    <div className="flex justify-center items-center p-8 h-screen bg-transparent w-full">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;


