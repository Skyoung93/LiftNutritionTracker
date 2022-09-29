import React from 'react';
import { RiSave3Fill } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";

const BottomController = ({ addEntry, queryDB }) => {

  return (
    <div className= 'BtnRow'>
      <div className='button' onClick={addEntry} ><MdAddBox className='AddBtn'/></div>
      <div className='button' onClick={queryDB} ><RiSave3Fill className='SaveBtn' /></div>
    </div>
  )

};

export default BottomController;