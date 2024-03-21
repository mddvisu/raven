import { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import ClassIcon from '@mui/icons-material/Class';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import EditIcon from '@mui/icons-material/Edit';


const ClassInspector = ({data}) => {
    function getClassColor(abstract, interFace) {
        if (interFace) {
          return "bg-gradient-to-b from-[#2922c6] to-[#b279f2]"; // Color for interface
        } else if (abstract) {
          return "bg-gradient-to-b from-orange-500 to-[#e9a14f]"; // Color for abstract 
        }
        else{
          return "bg-gradient-to-b from-[#181e29] to-[#465970]";
        }
      }
    const [name, setName] = useState(data.name);
      
    const handleInput = (e) => {
        setName(e.target.textContent);
    }
    function getClassIcon(abstract, interFace, isStatic){
        if (interFace) {
          return (
            <Tooltip title="Interface">
              <AccountTreeIcon fontSize='medium' style={{ color: 'purple', margin:'2px' }}className='hover:'/>
            </Tooltip>
          );
        } else if (abstract ) {
          return (
            <Tooltip title="Abstract">
              <PaletteIcon fontSize='medium' style={{ color: 'orange', margin:'2px' }}
              className='hover:'/>
            </Tooltip>
          ); // Color for abstract
        }
        else{
          return (
            <Tooltip title='Class'>
              <ClassIcon fontSize='medium' style={{ color: 'white', margin:'2px' }}
              className='hover:'/>
            </Tooltip>
          );
        }
      }
      function getFinalOrStatic(isFinal, isStatic) {
        console.log("final: ", isFinal, "static: ", isStatic)
        if (isFinal) {
          return (
            <Tooltip title="Final">
              <FlagIcon fontSize="small" className='ml-1 rounded-xl bg-blue-500 p-1 hover:' />
            </Tooltip>
          );
        } else if (isStatic) {
          return (
            <Tooltip title = "Static">
              <BoltIcon fontSize="small" className='ml-1 rounded-xl bg-yellow-500  hover:' />
            </Tooltip>
          );
        } else {
          return null; // No icon for non-final and non-static attributes
        }
      }
    return (
    
    <div className={`flex  border-4 border-white p-2 rounded ${getClassColor(data.abstract, data.interface)} text-white rounded-xl w-[620px] h-[430px] overflow-y`}>
        <div className= "bg-gray-900 rounded-xl flex-grow flex flex-col mt-7 p-2">
            <div className="flex justify-end">
                <div className="items-center p-1 bg-black rounded-xl h-9 w-20 ">
                        {getClassIcon(data.static, data.final, data.static)}
                        {getFinalOrStatic(data.final, data.static)}&nbsp;
                </div>
            </div>
                <div
                    contentEditable
                    onInput={handleInput}
                    className="border-2 border-white m-2 rounded-xl bg-yellow-600 text-white font-bold w-[30%] p-2 text-xl"
                >
                    {data.name} &nbsp;
                    <div className="flex justify-start items-center">
                        <EditIcon fontSize='small'className='rounded-xl bg-white'/>
                    </div>
                </div>
                <div className="justify-start flex-row font-bold text-m p-2 text-left m-1 ml-10">
                    <div className="flex items-center">
                        Access 
                        <div className="border-2 border-white m-2 rounded-xl bg-yellow-600 text-white font-bold w-[40%] p-1 text-s text-center ml-11">
                            Public
                        </div>
                    </div>
                    <div className="flex items-center">
                        Interface  
                        <div className="border-2 border-white m-2 rounded-xl bg-yellow-600 text-white font-bold w-[10%] p-1 text-s text-center ml-7">
                            Yes
                        </div>
                    </div>
                    <div className="flex items-center">
                        Extends 
                        <div className="border-2 border-white m-2 rounded-xl bg-yellow-600 text-white font-bold w-[40%] p-1 text-s text-center ml-9">
                            Public
                        </div>
                    </div>
                    <div className="flex items-center">
                        Implements
                        <div className="border-2 border-white m-2 rounded-xl bg-yellow-600 text-white font-bold w-[40%] p-1 text-s text-center ml-2">
                            Public
                        </div>
                    </div>
                    
                </div>
        </div>
    </div>
    );
};

export default ClassInspector;