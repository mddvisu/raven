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

import { Route, Routes } from 'react-router-dom';
import { Welcome, Home } from '../src/pages';

const App = () => {// Run only once when the component mounts

  return (
    <div className="flex justify-center items-center p-8 h-screen bg-[#1b1b24] w-full">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;


