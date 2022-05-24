import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../Filter";

export default function VoyageursMenu() {
    
    const {voyageurs,setVoyageurs} = useContext(FilterContext);
    const[adultsMin,setadultsMin] = useState(0);

    function incrementValue(category,max) {
        
        setVoyageurs((voyageurs)=>{
            if (voyageurs[category]==max) return voyageurs; 
            return(
                {
                    ...voyageurs,
                    [category]:voyageurs[category]+1
                }
            )
        })   
    }
    
    function decrementValue(category,min) {
        setVoyageurs((voyageurs)=>{
            if (voyageurs[category]==min) return voyageurs;
            return(
                {
                    ...voyageurs,
                    [category]:voyageurs[category]-1
                })
        })   
    }

    //si adults est a 0 et que un des autre est a plus de 0 alors adultsMin devient 1 et voyageurs["adults"]=1
    useEffect(()=>{
        
        if (voyageurs["adults"]==0) 
        {
            for (const key in voyageurs) 
            {
                if (voyageurs[key]!=0) 
                {
                    setVoyageurs((voyageurs)=>({
                        ...voyageurs,
                        "adults" : 1
                    }))    
                    setadultsMin(1);
                }    
            }                
        }
        else
        {
            let tousAzero = true;
            for (const key in voyageurs) 
            {
                if (voyageurs[key]!=0 && key!="adults") tousAzero=false;
            }      
            
            if (tousAzero) setadultsMin(0);    
            
        }
        
    },[voyageurs])

    return(
        <div className="voyageurs-menu">
            <ul>
                <li>
                    <div>
                        <p>Adultes</p>
                        <span>13 ans et plus</span>
                    </div>
                    <div>
                        <button 
                            className={voyageurs["adults"]==adultsMin ? "disabled" : ""}
                            onClick={()=>{decrementValue("adults",adultsMin)}}
                        >-</button>
                        <p>{voyageurs["adults"]}</p>
                        <button 
                            className={voyageurs["adults"]==(16-voyageurs["kids"]) ? "disabled" : ""}
                            onClick={()=>{incrementValue("adults",16-voyageurs["kids"])}}
                        >+</button>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Enfants</p>
                        <span>De 2 à 12 ans</span>
                    </div>
                    <div>
                        <button
                            className={voyageurs["kids"]==0 ? "disabled" : ""}
                            onClick={()=>{decrementValue("kids",0)}}
                        >-</button>
                        <p>{voyageurs["kids"]}</p>
                        <button
                            className={voyageurs["kids"]==(16-voyageurs["adults"]) ? "disabled" : ""}
                            onClick={()=>{incrementValue("kids",16-voyageurs["adults"])}}
                        >+</button>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Bébés</p>
                        <span>- de 2 ans</span>
                    </div>
                    <div>
                        <button
                            className={voyageurs["babies"]==0 ? "disabled" : ""}
                            onClick={()=>{decrementValue("babies",0)}}
                        >-</button>
                        <p>{voyageurs["babies"]}</p>
                        <button
                            className={voyageurs["babies"]==5 ? "disabled" : ""}
                            onClick={()=>{incrementValue("babies",5)}}
                        >+</button>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Animaux domestiques</p>
                        <a href="">Vous voyagez avec un animal d'assistance ?</a>
                    </div>
                    <div>
                        <button
                            className={voyageurs["animals"]==0 ? "disabled" : ""}
                            onClick={()=>{decrementValue("animals",0)}}
                        >-</button>
                        <p>{voyageurs["animals"]}</p>
                        <button
                            className={voyageurs["animals"]==5 ? "disabled" : ""}
                            onClick={()=>{incrementValue("animals",5)}}
                        >+</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}