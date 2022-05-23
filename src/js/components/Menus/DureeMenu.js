import React, { useContext } from "react";
import { FilterContext } from "../Filter";

export default function DureeMenu() {

    const {setTypeFlexible,typeFlexible,setDateType,dateType,setSelectedZone} = useContext(FilterContext);
    

    return(
        <div className="duree-menu">
            <div className="duree-menu-choice">
                <button 
                    onClick={()=>{
                        setDateType("fixes");
                        setSelectedZone("arivee")
                    }}
                    className={dateType=="fixes" ? "active" : ""}>Dates fixes</button>
                <button 
                    onClick={()=>{
                        setDateType("flexibles");
                        setSelectedZone("duree")
                    }} 
                    className={dateType=="flexibles" ? "active" : ""}>Dates flexibles</button>
            </div>
            
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
                <div className="date-caroussel">
                    <div className="date-caroussel__wrapper">
                        <ul>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                            <li>
                                <img src="/images/calendar.jpg" alt=""/>
                                <p>Juin</p>
                                <span>2022</span>
                            </li>
                        </ul>
                    </div>
                    <button className="caroussel-btn btn-prev"></button>
                    <button className="caroussel-btn btn-next"></button>
                </div>
            </div>
        </div>
    )
}