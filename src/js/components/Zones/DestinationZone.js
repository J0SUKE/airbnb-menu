import React, {useContext, useRef, useState} from 'react';
import { FilterContext } from '../Filter';

export default function DestinationZone() {
    
    const {setMenu,selectedZone,setSelectedZone,destinatioValue,setDestinatioValue} = useContext(FilterContext);
    
    const inputNode = useRef();

    return(
        <li 
            onClick={()=>{
                        setMenu("destination");
                        setSelectedZone("destination");
                        inputNode.current.focus();
                    }}
            className={selectedZone=="destination" ? "active" : ""}
        >
            <div>
                <label htmlFor=''>Destination</label>
                <input type="text" placeholder="Recherchez des destinations"
                    value={destinatioValue}
                    ref={inputNode}
                    onInput={(e)=>{setDestinatioValue(e.target.value)}}
                />
            </div>
        </li>
    )
}