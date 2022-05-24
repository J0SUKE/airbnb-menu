import React, { useContext, useEffect, useRef, useState } from 'react'
import { DatesFlexiblesContext } from './DureeMenu'

function DatesFlexiblesMenu() 
{
    const {typeFlexible,setTypeFlexible} = useContext(DatesFlexiblesContext);
    
    return (
        <div className="dates-flexibles">
            <h2>Quelle sera la durée de votre séjour ?</h2>
            <ul className="dates-flexibles__duration">
                <li><button
                    onClick={(e)=>{setTypeFlexible("Un week-end")}}
                    className={typeFlexible=="Un week-end" ? "active" : ""}
                    >Un week-end</button></li>
                <li><button
                    onClick={(e)=>{setTypeFlexible("Une semaine")}}
                    className={typeFlexible=="Une semaine" ? "active" : ""}
                    >Une semaine</button></li>
                <li><button
                    onClick={(e)=>{setTypeFlexible("Un mois")}}
                    className={typeFlexible=="Un mois" ? "active" : ""}
                    >Un mois</button></li>
            </ul>
            <h2>Quand souhaitez-vous partir ?</h2>
            <CarousselDates/>
        </div>
  )
}

export default DatesFlexiblesMenu


function CarousselDates() {
    
    const {setMonthsList,months,setMonths} = useContext(DatesFlexiblesContext);
    const firstCarousselItem = useRef();
    const lastCarousselItem = useRef();
    const currentElementIndex = useRef(0);
    const[translation,setTranslation] = useState(0);

    let elemNums = 12; // 12 elements dans le caroussel (12 mois de l'année)    
    // doit obligatoirement etre pair

    function goNext(e) {
        e.stopPropagation();
        
        let width = firstCarousselItem.current.getBoundingClientRect().width;
        let marginRight = parseInt(getComputedStyle(firstCarousselItem.current)["margin-right"])
        let marginLeft = parseInt(getComputedStyle(lastCarousselItem.current)["margin-left"])
        
        if (currentElementIndex.current==elemNums/2) return;

        if (currentElementIndex.current==0) {
            width+=(marginRight*2);
        }
        else
        {
            width+=marginRight+(marginLeft);
        }
        
        setTranslation((translation)=>translation-(width*2));
        currentElementIndex.current+=2;
    }

    function goPrev(e) {
        e.stopPropagation();
        
        let width = firstCarousselItem.current.getBoundingClientRect().width;
        let marginRight = parseInt(getComputedStyle(firstCarousselItem.current)["margin-right"])
        let marginLeft = parseInt(getComputedStyle(lastCarousselItem.current)["margin-left"])

        if (currentElementIndex.current==0) {
            width+=(marginRight*2);
        }
        else
        {
            width+=marginRight+(marginLeft);
        }
        
        setTranslation((translation)=>translation+(width*2));
        currentElementIndex.current-=2;
    }

    function selectItem(e,month) {
        
        let target;
        if(e.target.classList.contains("caroussel-item")) target=e.target;
        else target = e.target.closest(".caroussel-item");
        
        target.style.animation = `animateDate .5s forwards`;
        
        setTimeout(() => {
            target.style.animation = `unset`;
        }, 500);
        
        setMonths((months)=>{    
            return({
                    ...months,
                    [month]:!months[month]
                })
        })  
    }


    useEffect(()=>{
        let mois = [];
        for (const month in months) {
            if (months[month]){
                mois.push(month);
            }
        }

        setMonthsList(mois);
    },[months])


    let now = new Date();
    
    let listItems = [];

    for (let i = 0; i < elemNums; i++) 
    {
        now.setMonth(now.getMonth()+1);
        let month = now.toLocaleString('default', { month: 'long' });

        listItems.push(
            <li 
                ref={i==0 ? firstCarousselItem : (i==(elemNums-1) ? lastCarousselItem : null)}
                key={month}
                onClick={(e)=>{selectItem(e,month)}}
                className={`caroussel-item ${months[month]===true ? "active": (months[month]===undefined) ? null : "inactive"}`}
            >
                <img src={months[month]===true ? "/images/calendar2.jpg" : "/images/calendar.jpg"} alt=""/>
                <p>{month}</p>
                <span>{now.getFullYear()}</span>
            </li>
        )
    }

    return(
        <div className="date-caroussel">
            <div className="date-caroussel__wrapper">
                <ul style={{transform:`translateX(${translation}px)`}}>
                    {listItems}
                </ul>
            </div>
            {
                currentElementIndex.current==0? 
                <button
                    onClick={goNext}
                    className="caroussel-btn btn-next"
                ></button>
                :
                (currentElementIndex.current==elemNums/2 ? 
                    <button 
                            onClick={goPrev}
                            className="caroussel-btn btn-prev"
                    ></button>
                    :
                    <>
                        <button
                            onClick={goNext}
                            className="caroussel-btn btn-next"
                        ></button>
                        <button 
                            onClick={goPrev}
                            className="caroussel-btn btn-prev"
                        ></button>
                    </>
                )
            }
            
        </div>
    )
}