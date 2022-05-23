import React, { useContext } from "react";
import { FilterContext } from "../Filter";

export default function DureeZone() {
    const {typeFlexible,dateType,setMenu,selectedZone,setSelectedZone} = useContext(FilterContext);
    
    return(
        <>
            {dateType=="fixes" ? 
                        <>
                            <li 
                                onClick={()=>{
                                    setMenu("duree");
                                    setSelectedZone("arivee")
                                }}
                                className={selectedZone=="arivee" ? "active" : ""}
                            >
                                <div>
                                    <span>Arrivée</span>
                                    <p className="empty">Quand</p>
                                </div>
                            </li>
                            <li 
                                onClick={()=>{
                                    setMenu("duree");
                                    setSelectedZone("depart")
                                }}
                                className={selectedZone=="depart" ? "active" : ""}
                            >
                                <div>
                                    <span>Départ</span>
                                    <p className="empty">Quand</p>
                                </div>
                            </li>   
                        </> 
                        :
                        <li 
                            onClick={()=>{
                                setMenu("duree");
                                setSelectedZone("duree")
                            }}
                            className={selectedZone=="duree" ? "active" : ""}
                        >
                            <div>
                                <span>Durée</span>
                                <p>{typeFlexible} en</p>
                            </div>
                        </li>}
        </>
    )
}