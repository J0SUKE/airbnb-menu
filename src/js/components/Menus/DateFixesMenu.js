import React, { useContext, useRef, useState } from 'react'
import { FilterContext } from '../Filter';

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
  
  const{datesFixes,setDatesFixes,selectedZone,setSelectedZone} = useContext(FilterContext);

  const NOW = new Date();
  
  let month = new Date();
  month.setMonth(month.getMonth()+decallage);
  month.setDate(1);
  let days = [];  
  
  let currentMonthName = month.toLocaleString('default', { month: 'long' });
  
  let currentYear = month.getFullYear();
  
  function selectDate(date) {
    
    if (selectedZone=="arivee") {
      setSelectedZone("depart");
    }

    if (datesFixes.arivee!=null) 
    {
      if (selectedZone=="depart")
      {
          if (date.getTime()<datesFixes.arivee.getTime()) 
          {
            setDatesFixes({
              depart:null,
              arivee:date
            })

            return;
          }    
      }
    }


    setDatesFixes((datesFixes)=>{
      
      return({
        ...datesFixes,
        [selectedZone]:date
      })
    })
  }


  for (let j = 0; j < 6; j++) // max 6 collonnes 
  {
    for (let i = 0; i < 7; i++) //max 7 lignes 
    {
      if (month.toLocaleString('default', { month: 'long' }) != currentMonthName) break;
      
      if (calendarDays[month.getDay()]==i) 
      {
        let currentDay = month.getDate();// le jour du mois 
        
        let dateFormat = `${currentDay} ${currentMonthName}`; // la date au format : 1 mai


        // on s'occupe de la class de li=================================================

        let liClass = (month.getTime()>=NOW.getTime() ? "" : "outdated");
        
        let departFormated = (datesFixes.depart==null? "" : `${datesFixes.depart.getDate()} ${datesFixes.depart.toLocaleString('default', { month: 'long' })}`);
        
        let ariveeFormated = (datesFixes.arivee==null? "" : `${datesFixes.arivee.getDate()} ${datesFixes.arivee.toLocaleString('default', { month: 'long' })}`);

        liClass+=((departFormated==dateFormat || ariveeFormated==dateFormat) ? "selected" : "");
        

        if (datesFixes.depart!=null && datesFixes.arivee!=null) 
        {
            if (isBetween(datesFixes.arivee,datesFixes.depart,month)) 
            {
                liClass+=" path";
            }
            
        }
        
        //==============================================================================

        let copy = new Date();
        copy.setTime(month.getTime());
        
        days.push(
          <li 
            className={liClass}
            key={`${dateFormat}`}
            // on ajout l'event onclick seulement si la date n'est pas avant NOW
            onClick={(month.getTime()>=NOW.getTime() ? ()=>{selectDate(copy)} : null)}
            
          ><p>{currentDay}</p></li>
        )  

        month.setDate(month.getDate()+1);
      }
      
      //empty
      else
      {
        days.push(
          <li 
            className='empty'
            key={`${i}${j}`}  
          ></li>
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


function isBetween(min,max,date) {
  
  
  //console.log(date.getTime()>min.getTime() && date.getTime()<max.getTime());
  return(date.getTime()>(min.getTime()) && date.getTime()<=(max.getTime()+1000*3600*24)); 
}

export default DateFixesMenu