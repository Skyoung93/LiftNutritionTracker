import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LiftEntry from './LiftEntry.jsx';
import DateController from './DateController.jsx';
import BottomController from './BottomController.jsx';

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
// make a copy of entry templay using
// JSON.parse(JSON.stringify(entryTemplate))

const Lifts = () => {
  // for future use, to implement WXDX in display
  let [ week, setWeek ] = useState(0);
  let [ day, setDay ] = useState(0);

  let [ listOfEntries, setListOfEntries ] = useState([JSON.parse(JSON.stringify(entryTemplate))]);
  let [ listOfExercises, setListOfExercises ] = useState([]);
  let [ calday, setCalday ] = useState(date.getDate());
  let [ month, setMonth ] = useState(date.getMonth() + 1);
  let [ year, setYear ] = useState(date.getFullYear());


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
    Promise.all([setListOfEntries(response)]);
  }

  let getLiftNames = async () => {
    let response = await axios.get(`http://localhost:3000/lifts/names`);
    response = response.data.rows;
    let arrOfExercises = [];
    for ( let i = 0; i < response.length; i++ ){
      arrOfExercises.push(response[i]['exercise']);
    }
    arrOfExercises.sort();
    setListOfExercises(arrOfExercises);
  };

  let addEntry = () => {
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
    .then(()=>{
      console.log('Success! All entries updated or posted!');
      alert("Successfully updated!");
    })
    .catch((err)=>{
      console.log('SHIT HIT THE FAN', err);
      alert("Well Shit... something went wrong...");
    })
    .finally(()=>{
      getLiftNames();
      logGoToDate(year, month, calday);
    });
  };

  let noLiftsPics = [
    `https://i.gifer.com/A1M.gif`,
    `https://media1.giphy.com/media/GgUPV5VvFytpu/200w.gif?cid=82a1493bzkbtxwcp49nlecq1j1xewxgjiyocvfp3ea6krfdx&rid=200w.gif&ct=g`,
    `https://i.gifer.com/7Pme.gif`,
    `https://media4.giphy.com/media/I0XkbK7YqF9u0/200w.gif?cid=82a1493bw24w6300v8i1k4czn73rmhmbnfossa9s9o5nxmy2&rid=200w.gif&ct=g`,
    `https://s1.alice.al/vt/image/1618/19/1618193518166.gif`,
    `https://i.gifer.com/NsHy.gif`,
  ]

  // TODOs:
  // Sort entries by exercise & allow user to add rows per exercise
  // Add Delete option to remove entries
  // Add check to prevent adding entries 1 year ahead (currently only prevents till next calendar year)
  // Turn DateDisplay into a reusable component

  return (
    <div>
      <div className="Title">Lifting Log</div>
      <DateController logGoToDate={logGoToDate} toToday={toToday} handleDateChange={handleDateChange} calday={calday} month={month} year={year} />
      {listOfEntries.length > 1 ?
      listOfEntries.map((entry, index) => {
        if (index === 0 || !entry.rating) {return null};
        return (
          <LiftEntry entry={entry} key={index} exerciseList={listOfExercises} entryState={listOfEntries} updateEntryState={setListOfEntries} index={index} />
        )
      })
      :
      <div className="NoEntryContainer">
        <div className='NoEntry'>Go Train Today!</div>
        <img className='NoEntryPic' src={`${noLiftsPics[Math.floor(Math.random() * noLiftsPics.length)]}`} ></img>
      </div>
      }
      <BottomController addEntry={addEntry} queryDB={queryDB} />
    </div>
  )

};

export default Lifts;