//import './App.css';
import { SelectJavaProjectDirectory } from '../logic/folderUtils';
import ravenLogo from "../assets/raven-logo.png"

const App = () => {
  return (
    <div className="flex  justify-center items-center p-8 h-screen  bg-indigo-950 w-full" >
      <header>
        
      </header>
      <div className='text-white mt-4 text-center'>
      <img className="w-[280px]" src={ravenLogo} alt="Raven Logo" />
        <p className=' text-4xl font-extrabold' style={{ fontFamily: 'Consolas' }}> R A V E N</p>
        <button className="mt-4 bg-indigo-800" onClick={SelectJavaProjectDirectory}>
          Open Project Directory
        </button>
      </div>
    </div>
  );
};

export default App;

