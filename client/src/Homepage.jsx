import React, { useState, useContext } from 'react';

import { PageStateContext } from './App.jsx';

const Homepage = () => {
  const { setDisplay } = useContext(PageStateContext);

  return (
    <div className="HomeContainer">
      <div className="NutritionPanel">
        <div className='Btn' onClick={()=>{setDisplay('Nutrition')}} >
        Nutrition Tracker
        </div>
      </div>
      <div className="LiftsPanel">
        <div className='Btn' onClick={()=>{setDisplay('Lifts')}} >
        Training Log
        </div>
      </div>
    </div>
  )
};

export default Homepage;