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
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {// Run only once when the component mounts

  return (
    <Router basename=''>
      <div className="flex justify-center items-center p-8 h-screen bg-transparent w-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


