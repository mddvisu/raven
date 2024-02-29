import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ClassNode = memo(({ data, isConnectable }) => {
  const getBackgroundColor = () => {
    if (data.classData.interface) {
      return 'bg-[#B03A2E]'; // Interface 
    } else if (data.classData.abstract) {
      return 'bg-[#7D3C98]'; // Abstract
    } else {
      return 'bg-[#148F77]'; // Normal
    }
  };
  return (
    //<div className="class-node border-4 p-5 rounded bg-[#2D4A53] text-white rounded-xl m-4 r-8">
    <div className={`class-node border-4 p-5 rounded ${getBackgroundColor()}   text-white rounded-xl m-4 r-8`}>
      <button
        value={data.classIndex}
        className="rounded-2xl border-white border-2 p-3 mb-5 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-bold w-full"
        onClick={data.onClick}
      >
        {data.classData.name}
      </button>
      <div className="block bg-black-700 text-xs" style={{ textAlign: "left" }}>
        <h2 className="label border-2 rounded-xl p-1 mb-1 font-mono font-bold bg-green-700">Access: {data.classData.access}</h2>
        <h2 className="label border-2 rounded-xl p-1 mb-1 font-mono font-bold bg-red-300">Extends: {data.classData.extends}</h2>
        <h2 className="label border-2 rounded-xl p-1 mb-1 font-mono font-bold bg-[#303a99]">Static: {data.classData.static.toString()}</h2>
        {/* <h2 className="label border-2 rounded-xl p-1 mb-1 font-mono bg-red-400">Abstract: {data.classData.abstract.toString()}</h2>
        <h2 className="label border-2 rounded-xl p-1 mb-1 font-mono bg-orange-500">Interface: {data.classData.interface.toString()}</h2>
        <h2 className="label border-2 rounded-xl p-1 mb-1 font-mono bg-red-900">Attributes: </h2> */}
        {/* <div className="class-node" style={{ textAlign: "left", fontSize: "75%" }}>
            {data.classData.attributes.map((attribute, index) => (
                <h2 className="label" key={index}>- {attribute.name}</h2>
            ))}
        </div> */}
        {/* <h2 className="label border-2 rounded-xl p-1 font-mono bg-orange-700">Methods: </h2>
        <div className="class-node" style={{ textAlign: "left", fontSize: "75%" }}>
            {data.classData.methods.map((method, index) => (
                <h5 className="label" key={index}>- {method.name}</h5>
            ))}
        </div> */}
      </div>
    </div>
  );
});

export default ClassNode;

