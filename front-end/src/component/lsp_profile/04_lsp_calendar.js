import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./000_calendar.css"

function LspCalendar() {
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
    <h1 className='text-center'>React Calendar</h1>
    <div className='calendar-container'>
      <Calendar onChange={setDate} value={date} />
    </div>
    <p className='text-center'>
      <span className='bold'>Selected Date:</span>{' '}
      {date.toDateString()}
    </p>
  </div>
  );
}

export default LspCalendar;