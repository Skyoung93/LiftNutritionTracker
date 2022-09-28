import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TiArrowLeftThick } from 'react-icons/ti';

import { BsXCircleFill } from 'react-icons/bs';


const FoodEntry = ({ entry, foodsList, index, entryState, updateEntryState })=> {
  if (!foodsList) {foodsList = []};

  let [ name, setName ] = useState(entry.name);
  let [ mass, setMass ] = useState(entry.mass);
  let [ carbs, setCarbs ] = useState(entry.carbs);
  let [ fiber, setFiber ] = useState(entry.fiber);
  let [ sugars, setSugars ] = useState(entry.sugars);
  let [ protein, setProtein ] = useState(entry.protein);
  let [ fats, setFats ] = useState(entry.fats);
  let [ trans, setTrans ] = useState(entry.trans);
  let [ saturated, setSaturated ] = useState(entry.saturated);

  let colors = [ 'white', '#533243', '#2C427C', '#D9CA6F', '#567361' ];

  useEffect(()=>{
    let copyEntries = [...entryState];
    let copyCurEntry = copyEntries[index];
    copyCurEntry['name'] = name;
    copyCurEntry['mass'] = mass;
    copyCurEntry['carbs'] = carbs;
    copyCurEntry['fiber'] = fiber;
    copyCurEntry['sugars'] = sugars;
    copyCurEntry['protein'] = protein;
    copyCurEntry['fats'] = fats;
    copyCurEntry['trans'] = trans;
    copyCurEntry['saturated'] = saturated;
    updateEntryState(copyEntries);
  }, [ name, mass, carbs, fiber, sugars, protein, fats, trans, saturated ]);

  let deleteEntry = async () => {
    let copyEntries = [...entryState];
    let curEntry = copyEntries[index];
    let curEntryID = copyEntries[index]['id'];
    curEntry = {};
    curEntry['id'] = curEntryID;
    copyEntries[index] = curEntry;
    updateEntryState(copyEntries);
  }

  return(
    <div className="FoodEntryContainer">
      <div className="TopRow" style={{borderBottom: `${colors[index % 5]} solid 3px`}}>
        <div></div>
        <div className="FoodInput">
          <div className='Label'>Food:</div>
          <input className='FoodEntry' type="text" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
          <TiArrowLeftThick className='arrow' />
          <select className='PreviousDropdown' onChange={(e)=>{setName(e.target.value)}}>
            <option value='' key={-1}>Foods</option>
            {foodsList.map(( food, index ) => {
              return(
              <option value={food} key={index} >{food}</option>
              )
            })}
          </select>
        </div>
        <div className='DeleteEntryButton' >
          <BsXCircleFill className='DelBtn' onClick={deleteEntry} style={{color: `${colors[index % 5]}`} } />
        </div>
      </div>
      <div className="MidRow">
        <div className="FoodMidRowEntry">
          <div className='Label'>Mass:</div>
          <input className='input' type="number" value={mass} onChange={(e)=>{if (e.target.value >= 0) {setMass(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Carbs:</div>
          <input className='input' type="number" value={carbs} onChange={(e)=>{if (e.target.value >= 0) {setCarbs(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Fiber:</div>
          <input className='input' type="number" value={fiber} onChange={(e)=>{if (e.target.value >= 0) {setFiber(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Sugars:</div>
          <input className='input' type="number" value={sugars} onChange={(e)=>{if (e.target.value >= 0) {setSugars(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Protein:</div>
          <input className='input' type="number" value={protein} onChange={(e)=>{if (e.target.value >= 0) {setProtein(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Fats:</div>
          <input className='input' type="number" value={fats} onChange={(e)=>{if (e.target.value >= 0) {setFats(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Trans:</div>
          <input className='input' type="number" value={trans} onChange={(e)=>{if (e.target.value >= 0) {setTrans(e.target.value)}}} ></input>
        </div>
        <div className="FoodMidRowEntry">
          <div className='Label'>Saturated:</div>
          <input className='input' type="number" value={saturated} onChange={(e)=>{if (e.target.value >= 0) {setSaturated(e.target.value)}}} ></input>
        </div>
      </div>
      <div className="BotRow">
      </div>
    </div>
  )

};

export default FoodEntry;