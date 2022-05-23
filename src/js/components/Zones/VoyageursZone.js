import React, { useContext } from 'react'
import { FilterContext } from '../Filter';

function VoyageursZone() 
{
    const {setMenu,selectedZone,setSelectedZone,voyageurs} = useContext(FilterContext);
    
    
    let voyageursList="";
    let voyageursNum =voyageurs["adults"]+voyageurs["kids"]; 
    voyageursList+=(voyageursNum==0 ? "" : `${voyageursNum} voyageur${voyageursNum==1 ? "":"s"}`);
    
    let babiesNum = voyageurs["babies"];
    voyageursList+=(babiesNum==0 ? "" : `, ${babiesNum} bébé${babiesNum==1 ? "" : "s"}`);
    
    let animalsNum = voyageurs["animals"];
    voyageursList+=(animalsNum==0 ? "" : `, ${animalsNum} anima${animalsNum==1 ? "l" : "aux"}`);

    
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
            {
                voyageursList=="" ? 
                <p className="empty">Qui ?</p>    
                :
                <p>{voyageursList}</p>    
            }
        </div>
        <div 
            className={`search-btn ${selectedZone==null ? "" : "active"}`}>
            <p>Rechercher</p>
        </div>
    </li>
  )
}

export default VoyageursZone