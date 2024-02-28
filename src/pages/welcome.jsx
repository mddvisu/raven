//import { SelectFolderPath } from '../logic/folderUtils';
import ravenLogo from "../assets/raven-logo.png"
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className='text-white mt-4 flex flex-col items-center' style={{ backgroundColor: '#4A90E2', minHeight: '100vh' }}>
      <div className="text-center">
        <h1 className='text-8xl font-extrabold underline' style={{ fontFamily: 'Arial, sans-serif' }}>WELCOME</h1>
        <p className='text-7xl font-extrabold' style={{ fontFamily: 'Arial, sans-serif' }}>TO</p>
        <p className='text-7xl font-extrabold underline' style={{ fontFamily: 'Arial, sans-serif' }}>RAVEN</p>
        <p className="mt-10">2024 UNCO Properties Raven Inc.</p>

        <button className="mt-8 px-6 py-3 bg-black rounded-2xl border-[#2f315f] border-4 outline-none focus:outline-none">
          <Link className="text-2xl font-bold text-[#FFD700]" style={{ fontFamily: 'Arial, sans-serif' }} to="/Home">Press Start</Link>
        </button>
      </div>

      <div>
        <img className="w-[500px] mt-8" src={ravenLogo} alt="Raven Logo" />
      </div>
    </div>
  );
};

export default Welcome;

