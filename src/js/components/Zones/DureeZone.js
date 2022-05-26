import React, { useContext } from "react";
import { FilterContext } from "../Filter";

export default function DureeZone() {
    const {typeFlexible,dateType,setMenu,selectedZone,setSelectedZone,monthsList,datesFixes,dateFixeRange,setDatesFixes} = useContext(FilterContext);

    let monthsString = monthsList.join(",");

    function clearInputs(e) {
        e.stopPropagation();
        setDatesFixes({
            depart:null,
            arivee:null
          })   

        if (selectedZone=="depart") {
            setSelectedZone("arivee");
        }
    }

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
                                        <p>{`${datesFixes["arivee"].getDate()} ${datesFixes["arivee"].toLocaleString('default', { month: 'long' })}`}
                                        <strong>{dateFixeRange}</strong>
                                        </p>
                                    }
                                </div>
                                {
                                    selectedZone=="arivee" ? 
                                    (datesFixes["arivee"]==null ? null : <div><button onClick={clearInputs}>+</button></div>)
                                    :null   
                                }
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
                                        <p>{`${datesFixes["depart"].getDate()} ${datesFixes["depart"].toLocaleString('default', { month: 'long' })}`}
                                        <strong>{dateFixeRange}</strong>
                                        </p>
                                    }
                                </div>
                                {
                                    selectedZone=="depart" ? 
                                    (datesFixes["depart"]==null ? null : <div><button onClick={clearInputs}>+</button></div>)
                                    :null   
                                }
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