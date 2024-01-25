//import './App.css';
import { SelectFolderPath } from '../logic/folderUtils';
import ravenLogo from "../assets/raven-logo.png"

const App = () => {
  return (
    <div className="flex  justify-center items-center p-8 h-screen  bg-transparent w-full">
      <header>
        
      </header>
      <div className='text-white mt-4 text-center'>
      <img className="w-[280px]" src={ravenLogo} alt="Raven Logo" />
        <p className=' text-4xl font-extrabold' style={{ fontFamily: 'Consolas' }}> R A V E N</p>
        <button className="mt-4" onClick={SelectFolderPath}>
          Open Project Directory
        </button>
      </div>
    </div>
  );
};

export default App;

