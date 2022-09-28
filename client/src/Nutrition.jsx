import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RiSave3Fill } from "react-icons/ri";
import { MdAddBox, MdOutlineUpdate } from "react-icons/md";

import FoodEntry from './FoodEntry.jsx';
import { convertDatefromUnix, convertDatetoUnix } from './helpers.jsx';

let date = new Date();
let dateUnix = date.getTime();
let entryTemplate = {
  "id": 0,
  "name": '',
  "mass": 0,
  "carbs": 0,
  "fiber": 0,
  "sugars": 0,
  "protein": 0,
  "fats": 0,
  "trans": 0,
  "saturated": 0,
  "year": date.getFullYear(),
  "month": date.getMonth() + 1,
  "calday": date.getDate()
};
// make a copy of entry templay using
// JSON.parse(JSON.stringify(entryTemplate))

const Nutrition = () => {
  let [ listOfEntries, setListOfEntries ] = useState([JSON.parse(JSON.stringify(entryTemplate))]);
  let [ listOfFoods, setListOfFoods ] = useState([]);
  let [ calday, setCalday ] = useState(date.getDate());
  let [ month, setMonth ] = useState(date.getMonth() + 1);
  let [ year, setYear ] = useState(date.getFullYear());

  useEffect(()=>{
    logGoToDate(year, month, calday);
    getFoodsNames();
  }, []);

  let handleDateChange = ( state, value ) => {
    if (value === '') {value = '0'};
    if(state === 'month') {if (parseInt(value) > 12){value = '12'}; setMonth(parseInt(value))};
    if(state==='calday') {if (parseInt(value) > 31){value = '31'};  setCalday(parseInt(value))};
    if(state==='year') {if (parseInt(value) > date.getFullYear()){value = `${date.getFullYear()}`}; setYear(parseInt(value))};
  }

  let toToday = () => {
    let time = convertDatefromUnix(dateUnix);
    Promise.all([ setCalday(time.calday), setMonth(time.month), setYear(time.year) ])
    .then(()=>{logGoToDate(time.year, time.month, time.calday)});
  }

  let logGoToDate = async (year, month, calday) => {
    setListOfEntries([JSON.parse(JSON.stringify(entryTemplate))]);
    let date = convertDatetoUnix(year, month, calday);
    let response = await axios.get(`http://localhost:3000/foods/date/${date}`);
    response = response.data.rows;
    response = [JSON.parse(JSON.stringify(entryTemplate))].concat(response);
    Promise.all([setListOfEntries(response)]);
  }

  let getFoodsNames = async () => {
    let response = await axios.get(`http://localhost:3000/foods/names`);
    response = response.data.rows;
    let arrOfFoods = [];
    for ( let i = 0; i < response.length; i++ ){
      arrOfFoods.push(response[i]['name']);
    }
    arrOfFoods.sort();
    setListOfFoods(arrOfFoods);
  };

  let addFood = () => {
    let copyOfEntries = [...listOfEntries];
    let newEntry = JSON.parse(JSON.stringify(entryTemplate));
    copyOfEntries.push(newEntry);
    setListOfEntries(copyOfEntries);
  };

  let queryDB = () => {
    let promises = [];
    let copyList = [...listOfEntries];
    for ( let i = 1; i < copyList.length; i++ ) {
      let curEntry = copyList[i];
      let id = curEntry['id'];
      let mass = curEntry['mass'];
      let name = curEntry['name'];

      let date = convertDatetoUnix(curEntry.year, curEntry.month, curEntry.calday);
      curEntry['date'] = date;
      delete curEntry['year'];
      delete curEntry['month'];
      delete curEntry['calday'];

      if (id !== 0) { // requires attention
        if ( !mass ) {promises.push(axios.delete(`http://localhost:3000/foods/${id}`)) } // marked for deletion
        else { promises.push(axios.put(`http://localhost:3000/foods`, curEntry)) }; // old, update

      } else if ( id === 0 && mass && name ) {// new/insert, send only if there's a name for the exercise
        if ( !curEntry['carbs'] ) { curEntry['carbs'] = 0 };
        if ( !curEntry['fiber'] ) { curEntry['fiber'] = 0 };
        if ( !curEntry['sugars'] ) { curEntry['sugars'] = 0 };
        if ( !curEntry['protein'] ) { curEntry['protein'] = 0 };
        if ( !curEntry['fats'] ) { curEntry['fats'] = 0 };
        if ( !curEntry['trans'] ) { curEntry['trans'] = 0 };
        if ( !curEntry['saturated'] ) { curEntry['saturated'] = 0 };
        promises.push(axios.post(`http://localhost:3000/foods`, curEntry));
      }
    }
    Promise.all(promises)
    .then(()=>{
      console.log('Success! All entries updated or posted!');
      alert("Successfully updated!");
      getFoodsNames();
      logGoToDate(year, month, calday);
    })
    .catch((err) => {
      console.log('SHIT HIT THE FAN', err);
      alert("Well Shit... something went wrong...");
      getFoodsNames();
      logGoToDate(year, month, calday);
    });
  };

  // TODO:
  // Add Delete option to remove entries
  // Add check to prevent adding entries 1 year ahead (currently only prevents till next calendar year)
  // Turn DateDisplay into a reusable component


  return(
    <div className="LiftsContainer">
      <div className='DateDisplay'>
        <div className='LabelContainer'>
          <div className='Label'>Month</div>
          <input className='Month' value={month} onChange={(e)=>{handleDateChange('month', e.target.value)}} ></input>
        </div>
        <div className='LabelContainer'>
          <div className='Label' >Day</div>
          <input className='Calday' value={calday} onChange={(e)=>{handleDateChange('calday', e.target.value)}} ></input>
        </div>
        <div className='LabelContainer'>
          <div className='Label' >Year</div>
          <input className='Year' value={year} onChange={(e)=>{handleDateChange('year', e.target.value)}} ></input>
        </div>
        <div className='button' onClick={toToday}>TODAY</div>
        <div className='button' onClick={()=>{logGoToDate(year, month, calday)}}><MdOutlineUpdate className='UpdateBtn' /></div>
      </div>
      {listOfEntries.map((entry, index) => {
        if (index === 0 || entry.mass === undefined) {return null};
        return (
          <FoodEntry entry={entry} key={index} foodsList={listOfFoods} entryState={listOfEntries} updateEntryState={setListOfEntries} index={index} />
        )
      })}
      <div className= 'BtnRow'>
        <div className='button' onClick={addFood} ><MdAddBox className='AddBtn'/></div>
        <div className='button' onClick={queryDB} ><RiSave3Fill className='SaveBtn' /></div>
      </div>
    </div>
  )
};

export default Nutrition;