import React, { useState, createContext } from 'react';

import NavBar from './NavBar.jsx';
import Homepage from './Homepage.jsx';
import Nutrition from './Nutrition.jsx';
import Lifts from './Lifts.jsx';

import styles from './styles.css'

export const PageStateContext = createContext({
  display: ''
})

const App = () => {
  // possible states:
  //- Home (Default)
  // - Nutrition
  // - Lifting
  let [ display, setDisplay ] = useState('Homepage');
  let currentDisplay = { display, setDisplay };


  return (
    <>
      <PageStateContext.Provider value={currentDisplay}>
        <NavBar />
        {display === 'Homepage' ?
          <Homepage /> :
        display === 'Nutrition' ?
          <Nutrition />:
        display === 'Lifts' ?
          <Lifts /> :
        null}
      </PageStateContext.Provider>
    </>
  )
}

export default App;

// <NavBar />
// <HomePage />
// <Nutrition />
// <Lifting />

// Extra?
// <Graphs />