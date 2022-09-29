import React, { useState, useContext } from 'react';

import { PageStateContext } from './App.jsx';

const Homepage = () => {
  const { setDisplay } = useContext(PageStateContext);

  return (
    <div className="HomeContainer">
      <div className="NutritionPanel" onClick={()=>{setDisplay('Nutrition')}} >
        <div className='button NutritionButton' >
        Nutrition Tracker
        </div>
      </div>
      <div className="LiftsPanel" onClick={()=>{setDisplay('Lifts')}} >
        <div className='button LiftsButton' >
        Training Log
        </div>
      </div>
    </div>
  )
};

export default Homepage;