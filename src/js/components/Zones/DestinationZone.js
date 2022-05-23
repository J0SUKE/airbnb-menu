import React, {useContext, useState} from 'react';
import { FilterContext } from '../Filter';

export default function DestinationZone() {
    
    const {setMenu,selectedZone,setSelectedZone,destinatioValue,setDestinatioValue} = useContext(FilterContext);
        
    return(
        <li 
            onClick={()=>{
                        setMenu("destination");
                        setSelectedZone("destination");
                        document.querySelector(".filter-menu li input").focus();
                    }}
            className={selectedZone=="destination" ? "active" : ""}
        >
            <div>
                <label htmlFor=''>Destination</label>
                <input type="text" placeholder="Recherchez des destinations"
                    value={destinatioValue}
                    onInput={(e)=>{setDestinatioValue(e.target.value)}}
                />
            </div>
        </li>
    )
}