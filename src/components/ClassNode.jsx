import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ClassNode = memo(({ data, isConnectable }) => (
  <>
    <div className="class-node border border-black-500 p-5 rounded bg-black text-white">
      <button value={data.classIndex} className="button border border-gray-300 p-5 mb-5 rounded bg-red-900 text-gray-800 font-bold w-full" 
        onClick={data.onClick}>{data.classData.name}
      </button>
      <div className="block bg-black-700 text-xs" style={{ textAlign: "left" }}>
        <h2 className="label">Access: {data.classData.access}</h2>
        <h2 className="label">Extends: {data.classData.extends}</h2>
        <h2 className="label">Static: {data.classData.static.toString()}</h2>
        <h2 className="label">Abstract: {data.classData.abstract.toString()}</h2>
        <h2 className="label">Interface: {data.classData.interface.toString()}</h2>
        <h2 className="label">Attributes: </h2>
        <div className="class-node" style={{ textAlign: "left", fontSize: "75%" }}>
          {data.classData.attributes.map((attribute, index) => (
            <h5 className="label" key={index}>- {attribute.name}</h5>
          ))}
        </div>
        <h2 className="label">Methods: </h2>
        <div className="class-node" style={{ textAlign: "left", fontSize: "75%" }}>
          {data.classData.methods.map((method, index) => (
            <h5 className="label" key={index}>- {method.name}</h5>
          ))}
        </div>
      </div>
    </div>
  </>
));

export default ClassNode;
