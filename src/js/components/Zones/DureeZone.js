import React, { useContext } from "react";
import { FilterContext } from "../Filter";

export default function DureeZone() {
    const {typeFlexible,dateType,setMenu,selectedZone,setSelectedZone,monthsList,datesFixes} = useContext(FilterContext);
    
    //console.log(monthsList);
    let monthsString = monthsList.join(",");

    return(
        <>
            {dateType=="fixes" ? 
                        <>
                            <li 
                                onClick={()=>{
                                    setMenu("duree");
                                    setSelectedZone("arivee")
                                }}
                                className={`arrivee ${selectedZone=="arivee" ? "active" : ""}`}
                            >
                                <div>
                                    <span>Arrivée</span>
                                    {
                                        datesFixes["arivee"]==null?
                                        <p className="empty">Quand ?</p>
                                        :
                                        <p>{`${datesFixes["arivee"].getDate()} ${datesFixes["arivee"].toLocaleString('default', { month: 'long' })}`}</p>
                                    }
                                </div>
                            </li>
                            <li 
                                onClick={()=>{
                                    setMenu("duree");
                                    setSelectedZone("depart")
                                }}
                                className={`depart ${selectedZone=="depart" ? "active" : ""}`}
                            >
                                <div>
                                    <span>Départ</span>
                                    {
                                        datesFixes["depart"]==null?
                                        <p className="empty">Quand ?</p>
                                        :
                                        <p>{`${datesFixes["depart"].getDate()} ${datesFixes["depart"].toLocaleString('default', { month: 'long' })}`}</p>
                                    }
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
                                <p>{typeFlexible} en {monthsString}</p>
                            </div>
                        </li>}
        </>
    )
}