import React, { memo } from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BoltIcon from '@mui/icons-material/Bolt';
import FlagIcon from '@mui/icons-material/Flag';
import Tooltip from '@mui/material/Tooltip';
import PaletteIcon from '@mui/icons-material/Palette';
import ClassIcon from '@mui/icons-material/Class';




// Function to determine the color class based on attribute type
function getAttributeType(type) {
  switch (type) {
    case "int":
      return "bg-pink-500 p-1";
    case "string":
      return "bg-yellow-600 p-1";
    case "double":
      return "bg-green-600 p-1";
    case "float":
      return "bg-pink-700 p-1";
    default:
      return "bg-black p-1"; // Default color for unknown types
  }
}


function getAccessTypeIcon(access) {
  switch (access) {
    case "public":
      return (
        <Tooltip title="Public">
          <LockOpenIcon fontSize='small'className='rounded-xl bg-green-500 p-1 hover:'/>
        </Tooltip>
      );
    case "private":
      return (
        <Tooltip title="Private">
          <LockIcon fontSize='small'className='rounded-xl bg-red-500 p-1' />
        </Tooltip>
      );
    default:
      return null; // No icon for other access types
  }
}


function getClassColor(abstract, interFace) {
  if (interFace) {
    return "bg-purple-700"; // Color for interface
  } else if (abstract) {
    return "bg-orange-600"; // Color for abstract
  }
  else{
    return "bg-gray-600";
  }
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


const ClassNode = memo(({ data, isConnectable }) => {
  return (
    <div className={`flex border-4 border-white p-2 rounded ${getClassColor(data.classData.abstract, data.classData.interface)} text-white rounded-xl w-[300px] h-[350px]`}>
      <div className="flex flex-col flex-grow relative">
        <div className="flex flex-grow items-center justify-center">
          <div className="absolute top-0 right-0 p-1 bg-black rounded-xl">
            {getClassIcon(data.classData.static, data.classData.final, data.classData.static)}
            {getFinalOrStatic(data.classData.final, data.classData.static)}&nbsp;
          </div>
        </div>
        <div className='bg-gray-900 rounded-xl flex-grow flex flex-col mt-7'>
          <button value={data.classIndex} className=" m-2 rounded-xl bg-yellow-600 font-small text-white font-bold w-[40%] p-1"
            onClick={data.onClick}>{data.classData.name}
          </button>
          <div className="flex items-center">
            <p className='font-bold text-[16px] mr-2 ml-1'>ACCESS</p>
          </div>
          <div className="bg-green-500 rounded-3xl ml-2 mr-2 text-[16px]">
              <PublicIcon fontSize='small'/>
              {data.classData.access}
            </div>
          <div className="flex items-center">
            <p className='font-bold text-[16px] mr-2 mt-2 ml-1'>ATTRIBUTES</p>
          </div>
          <div className="ml-2" style={{ textAlign: "left", fontSize: "16px" }}>
            {data.classData.attributes.map((attribute, index) => (
              <span className={`label inline-block rounded-xl ${getAttributeType(attribute.type)} mr-1 mb-1`} key={index}>  &nbsp;
              {getAccessTypeIcon(attribute.access)}
              {getFinalOrStatic(attribute.static, attribute.final)}
              &nbsp;{attribute.name} &nbsp; </span>
            ))}
          </div>
          <div className="flex items-center">
            <p className='font-bold text-[16px] mr-2 mt-2 ml-1'>METHODS</p>
          </div>
          <div className="ml-2" style={{ textAlign: "left", fontSize: "16px" }}>
            {data.classData.methods.map((method, index) => (
              <span className={`label inline-block rounded-xl ${getAttributeType(method.type)} mr-1 mb-1 p-[2px]`} key={index}>  &nbsp;
              {getAccessTypeIcon(method.access)}
              {getFinalOrStatic(method.static, method.final)}
              &nbsp;{method.name} &nbsp; </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});


export default ClassNode;