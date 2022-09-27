import React, { useState, useContext } from 'react';

import { PageStateContext } from './App.jsx';

const NavBar = () => {
  const { setDisplay } = useContext(PageStateContext);

  return(
    <div className="TopContainer">
      <div className='NavBar'>
        <div className='Btn' onClick={()=>{setDisplay('Homepage')}} >
          <div className='imgFrame'>
            <img className='HomepageIcon' src='https://qph.cf2.quoracdn.net/main-qimg-654ce9c0c6923170c633c4b6f6947e93-lq'></img>
          </div>
        </div>
        <div className='Btn' onClick={()=>{setDisplay('Nutrition')}} >
        Nutrition Tracker
        </div>
        <div className='Btn' onClick={()=>{setDisplay('Lifts')}} >
        Training Log
        </div>
      </div>
    </div>
  )
};

export default NavBar;