import React from 'react';
import { MdOutlineUpdate } from 'react-icons/md';

const DateController = ({ logGoToDate, toToday, handleDateChange, calday, month, year }) => {

  return (
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
  )

};

export default DateController;