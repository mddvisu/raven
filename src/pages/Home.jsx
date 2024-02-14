import  { useState } from 'react';
import {RetrieveJavaClassModelBySelectingProjectDirectory} from "../logic/folderUtils";
import RavenLogo from "../assets/raven-logo.png"
//import {Layout} from '../components'
import {CloseableTab} from '../components';

const Home = () => {

  const [data, setData] = useState([{name: "", attributes: [], methods: [], abstract: false, interface: false, access: "public", extends: "", static: false, implements: []}]);

  async function RetrieveClassModel () {
    let stuff = await RetrieveJavaClassModelBySelectingProjectDirectory()
    setData(stuff);
    console.log(stuff);
  }

  return (
    <div className="text-white mt-4 text-center">
      <div className="bg-[#68666c] flex border-4 rounded-3xl">
        <div className="w-2/8 p-2 bg-[#282729] rounded-3xl p-2 m-2 items-center justify-center">
          <div className='w-[300px] justify-center items-center'>
          <header className="flex flex-row mb-4">
                <img src={RavenLogo} className='w-[50px] mr-5'/>
                <button className='rounded-3xl' onClick={RetrieveClassModel}>Open Project Directory</button>
          </header>
          </div>
        </div>
        <div className="w-6/8 bg-[#1b1b24] flex p-2 m-2 rounded-3xl border w-[680px] h-[580px] text-white">
          <div className=''>
            <CloseableTab classData={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
