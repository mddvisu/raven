import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div className="text-updater-node">
        <button value={data.classData.name} style={{backgroundColor: "green"}} onClick={ data.onClick } >{data.classData.name}</button>
      </div>
    </>
  );
});