import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TiArrowLeftThick } from 'react-icons/ti';
import { BsXCircleFill } from 'react-icons/bs';


const LiftEntry = ({ entry, exerciseList, index, entryState, updateEntryState })=> {
  if (!exerciseList) {exerciseList = []};

  let [ exercise, setExercise ] = useState(entry.exercise);
  let [ weight, setWeight ] = useState(entry.weight);
  let [ set, setSet ] = useState(entry.set);
  let [ reps, setReps ] = useState(entry.reps);
  let [ rating, setRating ] = useState(entry.rating);
  let [ notes, setNotes ] = useState(entry.notes);

  let colors = [ 'white', '#533243', '#2C427C', '#D9CA6F', '#567361' ];

  useEffect(()=>{
    let copyEntries = [...entryState];
    let copyCurEntry = copyEntries[index];
    copyCurEntry['exercise'] = exercise;
    copyCurEntry['weight'] = weight;
    copyCurEntry['set'] = set;
    copyCurEntry['reps'] = reps;
    copyCurEntry['rating'] = rating;
    copyCurEntry['notes'] = notes;
    updateEntryState(copyEntries);
  }, [ exercise, weight, set, reps, rating, notes ]);

  let deleteEntry = async () => {
    let copyEntries = [...entryState];
    let curEntry = copyEntries[index];
    let curEntryID = copyEntries[index]['id'];
    curEntry = {};
    curEntry['id'] = curEntryID;
    copyEntries[index] = curEntry;
    console.log(copyEntries);
    updateEntryState(copyEntries);
  }

  return (
    <div className="LiftEntryContainer">
      <div className="TopRow" style={{borderBottom: `${colors[index % 5]} solid 3px`}}>
        <div></div>
        <div className="ExerciseInput">
          <div className='Label'>Exercise:</div>
          <input className='ExerciseEntry' type="text" value={exercise} onChange={(e)=>{setExercise(e.target.value)}}></input>
          <TiArrowLeftThick className='arrow' />
          <select className='PreviousDropdown' onChange={(e)=>{setExercise(e.target.value)}}>
            <option value='' key={-1}>Excercises</option>
            {exerciseList.map(( exercise, index ) => {
              return(
              <option value={exercise} key={index} >{exercise}</option>
              )
            })}
          </select>
        </div>
        <div className='DeleteEntryButton' >
          <BsXCircleFill className='DelBtn' onClick={()=>{console.log('test'); deleteEntry()}} style={{color: `${colors[index % 5]}`} } />
        </div>
      </div>
      <div className="MidRow">
        <div className="MidRowEntry">
          <div className='Label'>Weight:</div>
          <input className='input' type="number" value={weight} onChange={(e)=>{if (e.target.value >= 0) {setWeight(e.target.value)}}} ></input>
        </div>
        <div className="MidRowEntry">
          <div className='Label'>Set(s):</div>
          <input type="number" className='input' value={set} onChange={(e)=>{if (e.target.value >= 0) {setSet(e.target.value)}}} ></input>
        </div>
        <div className="MidRowEntry">
          <div className='Label'>Reps:</div>
          <input type="number" className='input' value={reps} onChange={(e)=>{if (e.target.value >= 0) {setReps(e.target.value)}}} ></input>
        </div>
        <div className="MidRowEntry">
          <div className='Label'>Rating:</div>
          <input type="number" className='input' value={rating} onChange={(e)=>{if (e.target.value > 0 && e.target.value <= 5 && e.target.value % 1 === 0) {setRating(e.target.value)}}} ></input>
        </div>
        <div className="notes">
          <div className='Label'>Notes:</div>
          <input className='NotesInput' type="text" value={notes} onChange={(e)=>{setNotes(e.target.value)}} placeholder={`What are you thinking?`} ></input>
        </div>
      </div>
      <div className="BotRow">
      </div>
    </div>
  )

};

export default LiftEntry;

// TODO:
// - Adjust it so that can group by entry