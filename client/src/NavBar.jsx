import React, { useState, useContext } from 'react';

import { PageStateContext } from './App.jsx';

const NavBar = () => {
  const { setDisplay } = useContext(PageStateContext);

  return(
    <div className="TopContainer">
      <div className='NavBar'>
        <div className='Btn' onClick={()=>{setDisplay('Homepage')}} >
        <div className='imgFrame'>
            <img className='HomepageIcon' src='https://s3-media0.fl.yelpcdn.com/bphoto/f02PpF1ofSMdITW2Y_z6tQ/o.jpg'></img>
          </div>
        </div>
        <div className='Btn' onClick={()=>{setDisplay('Nutrition')}} >
        <div className='imgFrame'>
            <img className='NutritionIcon' src={`https://media.istockphoto.com/vectors/line-icon-set-of-fork-spoon-and-knife-black-vector-cutlery-icons-on-vector-id1188713619?k=20&m=1188713619&s=612x612&w=0&h=2hgeK1EVhFzDXO-Dhzv0LidKtZAR5jypIyhg4LFKPd4=`}></img>
          </div>
        </div>
        <div className='Btn' onClick={()=>{setDisplay('Lifts')}} >
          <div className='imgFrame'>
            <img className='TrainLogIcon' src='https://qph.cf2.quoracdn.net/main-qimg-654ce9c0c6923170c633c4b6f6947e93-lq'></img>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NavBar;