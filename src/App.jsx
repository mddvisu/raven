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


//import { SelectFolderPath } from '../logic/folderUtils';
//import ravenLogo from "../assets/raven-logo.png"
import { Welcome, Home,  } from '../src/pages';

const App = () => {
  return (
    <div className="flex  justify-center items-center p-8 h-screen  bg-transparent w-full">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

