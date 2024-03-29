import React, { useState } from 'react';
import { RetrieveJavaClassModels } from '../logic/folderUtils';
import RavenLogo from '../assets/raven-logo.png';
import { CloseableTab } from '../components';
import { Link } from 'react-router-dom';
import { os, filesystem, events } from "@neutralinojs/lib"

let CurrentWatcherID = -1;

const Home = () => {
  const [data, setData] = useState([]);

  async function retrieveClassModel() {
    let projectDir = await os.showFolderDialog('Open a project Directory', {});
    if (CurrentWatcherID >= 0) await filesystem.removeWatcher(CurrentWatcherID);
    CurrentWatcherID = await filesystem.createWatcher(projectDir);
    let classes = await RetrieveJavaClassModels(projectDir);
    console.log(classes);
    setData(classes);
  }

  events.on('watchFile', async (evt) => {
    if(CurrentWatcherID == evt.detail.id) {
        let classes = await RetrieveJavaClassModels(evt.detail.dir);
        setData(classes);
    }
  });

  return (
    <div className="text-white mt-4 text-center">
      <div className="bg-[#68666c] flex border-4 rounded-3xl">
        <div className="w-2/8 bg-[#282729] rounded-3xl p-2 m-2 items-center justify-center">
          <div className='w-[300px] justify-center items-center'>
            <header className="flex flex-row mb-4">
              <Link to="/" className="mr-5">
                <img src={RavenLogo} alt="Raven Logo" className='w-[50px]'/>
              </Link>
              <button className='rounded-3xl' onClick={retrieveClassModel}>Open Project Directory</button>
            </header>
          </div>
        </div>
        <div className="w-6/8 bg-[#1b1b24] flex p-2 m-2 rounded-3xl border w-[680px] h-[580px] text-white">
          <div>
            <CloseableTab classData={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
