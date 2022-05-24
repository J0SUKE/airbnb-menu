import React, { useRef, useState } from 'react'

function DateFixesMenu() {
  return (
    <div className='dates-fixes'>
      <div className="calendar-caroussel">
        <div className="weekdays">
          <ul>
            <li>lu</li>
            <li>ma</li>
            <li>me</li>
            <li>je</li>
            <li>ve</li>
            <li>sa</li>
            <li>di</li>
          </ul>
          <ul>  
            <li>lu</li>
            <li>ma</li>
            <li>me</li>
            <li>je</li>
            <li>ve</li>
            <li>sa</li>
            <li>di</li>
          </ul>
        </div>
        <Calendar/>
      </div>

      <div className="dates-details">
        <button className='active'>Dates exactes</button>
        <button>± 1 jour</button>
        <button>± 2 jours</button>
        <button>± 3 jours</button>
        <button>± 7 jours</button>
      </div>
    </div>
  )
}

let calendarDays = {
  0:6,
  1:0,
  2:1,
  3:2,
  4:3,
  5:4,
  6:5,
}

function Calendar() {
      
  const[leftMonth,setLeftMonth] = useState(0);
  const calendarWrapper = useRef();


  let calendarSile = <>
                        <Month decallage={leftMonth}/>
                        <Month decallage={leftMonth+1}/>
                    </>

  function GoNext() {
    // calendarWrapper.current.style.animation = `animateCalendarNext .4s`;  
    // setTimeout(() => {
    //   calendarWrapper.current.style.animation = `unset`;  
    // }, 400);
    setLeftMonth(leftMonth=>leftMonth+1);
  }

  return(
    <>
      <button 
        className="caroussel-btn btn-prev"
        onClick={()=>{setLeftMonth(leftMonth=>leftMonth-1)}}
        ></button>
      <button 
        className="caroussel-btn btn-next"
        onClick={GoNext}
        ></button>
      <div className="calendar-caroussel__wrapper">
            <div className="calendar-caroussel-container" ref={calendarWrapper}>
                {calendarSile}
            </div>
            
        </div>
    </>
  )
} 


function Month({decallage}) 
{
  
  const NOW = new Date();
  
  let month = new Date();
  month.setMonth(month.getMonth()+decallage);
  month.setDate(1);
  let days = [];  
  
  let currentMonthName = month.toLocaleString('default', { month: 'long' });
  let currentYear = month.getFullYear();
  
  for (let j = 0; j < 6; j++) // max 6 collonnes 
  {
    for (let i = 0; i < 7; i++) //max 7 lignes 
    {
      if (month.toLocaleString('default', { month: 'long' }) != currentMonthName) break;
      
      if (calendarDays[month.getDay()]==i) 
      {
        let liClass = (month.getTime()>=NOW.getTime() ? "" : "outdated");

        days.push(
          <li 
            className={liClass}
            key={`${month.getDate()}${month.getFullYear()}`}
          >{month.getDate()}</li>
        )  

        month.setDate(month.getDate()+1);
      }
      
      else
      {
        days.push(
          <li className='empty'></li>
        )  
      }
        
    }

    if (month.toLocaleString('default', { month: 'long' }) != currentMonthName) break;
    
  } 

  return(
    <div className="month">
      <h3>{currentMonthName} {currentYear}</h3>
      <ul className="days">
        {days}
      </ul>
    </div>
  );
}

export default DateFixesMenu