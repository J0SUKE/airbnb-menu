import React, { useContext } from 'react'
import { FilterContext } from '../Filter';

function VoyageursZone() 
{
    const {setMenu,selectedZone,setSelectedZone} = useContext(FilterContext);
    return (
    <li 
        onClick={()=>{
            setMenu("voyageurs");
            setSelectedZone("voyageurs")
        }}
        className={selectedZone=="voyageurs" ? "active" : ""}
    >
        <div>
            <span>Voyageurs</span>
            <p className="empty">Qui ?</p>
        </div>
        <div 
            className={`search-btn ${selectedZone==null ? "" : "active"}`}>
            <p>Rechercher</p>
        </div>
    </li>
  )
}

export default VoyageursZone