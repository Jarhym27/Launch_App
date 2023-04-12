import React, { useState } from 'react';
import calendar from 'react-calendar';
import './lsp_profile.css';



function lspCalendar() {

  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1 className='text-center'>Launch Service Provider Calendar</h1>
      <div className='calendar-container'>
        <lspCalendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default lspCalendar;
