import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RiSave3Fill } from "react-icons/ri";
import { MdAddBox, MdOutlineUpdate } from "react-icons/md";

import LiftEntry from './LiftEntry.jsx';
import { convertDatefromUnix, convertDatetoUnix } from './helpers.jsx';
let date = new Date();
let dateUnix = date.getTime();
let entryTemplate = {
  "id": 0,
  "week": 0,
  "day": 0,
  "exercise": '',
  "weight": '',
  "set": '',
  "reps": '',
  "rating": 5,
  "notes": '',
  "year": date.getFullYear(),
  "month": date.getMonth() + 1,
  "calday": date.getDate()
};

const Lifts = () => {
  let [ listOfEntries, setListOfEntries ] = useState([JSON.parse(JSON.stringify(entryTemplate))]);
  let [ listOfExercises, setListOfExercises ] = useState([]);
  let [ calday, setCalday ] = useState(date.getDate());
  let [ month, setMonth ] = useState(date.getMonth() + 1);
  let [ year, setYear ] = useState(date.getFullYear());
  let [ week, setWeek ] = useState(0);
  let [ day, setDay ] = useState(0);


  useEffect(()=>{
    logGoToDate(year, month, calday);
    getLiftNames();
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
    let response = await axios.get(`http://localhost:3000/lifts/date/${date}`);
    response = response.data.rows;
    response = [JSON.parse(JSON.stringify(entryTemplate))].concat(response);
    console.log(response);
    Promise.all([setListOfEntries(response)]);
  }

  let getLiftNames = async () => {
    let response = await axios.get('http://localhost:3000/lifts/names');
    response = response.data.rows;
    let arrOfExercises = [];
    for ( let i = 0; i < response.length; i++ ){
      arrOfExercises.push(response[i]['exercise']);
    }
    arrOfExercises.sort();
    setListOfExercises(arrOfExercises);
  };

  let addLift = () => {
    let copyOfEntries = [...listOfEntries];
    let newEntry = JSON.parse(JSON.stringify(entryTemplate));
    copyOfEntries.push(newEntry);

    // console.log(copyOfEntries);

    setListOfEntries(copyOfEntries);
  };

  let queryDB = () => {
    let promises = [];
    let copyList = [...listOfEntries];
    for ( let i = 1; i < copyList.length; i++ ) {
      let curEntry = copyList[i];
      let id = curEntry['id'];

      let date = convertDatetoUnix(curEntry.year, curEntry.month, curEntry.calday);
      curEntry['date'] = date;
      delete curEntry['year'];
      delete curEntry['month'];
      delete curEntry['calday'];

      if (id !== 0) { // requires attention
        if ( !curEntry.rating ) {promises.push(axios.delete(`http://localhost:3000/lifts/${id}`)) } // marked for deletion
        else { promises.push(axios.put(`http://localhost:3000/lifts`, curEntry)) }; // old, update

      } else if ( id === 0 ) {
        // new, insert
        if ( !curEntry['weight'] ) { curEntry['weight'] = 0 };
        if ( !curEntry['set'] ) { curEntry['set'] = 0; };
        if ( !curEntry['reps'] ) { curEntry['reps'] = 0 };
        if( curEntry['exercise'] ) {promises.push(axios.post(`http://localhost:3000/lifts`, curEntry));  }
        // send only if there's a name for the exercise
      }
    }
    Promise.all(promises)
    .then(()=>{console.log('Success! All entries updated or posted!')});
  };

  // TODOs:
  // Save to DB
  // Sort entries by exercise & allow user to add rows per exercise
  // Add Delete option to remove entries
  // Add check to prevent adding entries 1 year ahead (currently only prevents till next calendar year)
  return (
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
        if (index === 0 || !entry.rating) {return null};
        return (
          <LiftEntry entry={entry} key={index} exerciseList={listOfExercises} entryState={listOfEntries} updateEntryState={setListOfEntries} index={index} />
        )
      })}
      <div className= 'BtnRow'>
        <div className='button' onClick={addLift} ><MdAddBox className='AddBtn'/></div>
        <div className='button' onClick={queryDB} ><RiSave3Fill className='SaveBtn' /></div>
      </div>
    </div>
  )

};

export default Lifts;