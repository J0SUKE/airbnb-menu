import React, { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "../Filter";
import DatesFlexiblesMenu from "./DatesFlexiblesMenu";
import DateFixesMenu from "./DateFixesMenu";

export const DatesFlexiblesContext = React.createContext();

export default function DureeMenu() {

    const {setTypeFlexible,typeFlexible,setDateType,dateType,setSelectedZone,setMonthsList,monthsList,months,setMonths} = useContext(FilterContext);
    

    let DatesFlexiblesContextValue = {
        setMonthsList,
        monthsList,
        setTypeFlexible,
        typeFlexible,
        months,
        setMonths
    }

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
            
            <DatesFlexiblesContext.Provider value={DatesFlexiblesContextValue}>
                {dateType=="flexibles" ? 
                    <DatesFlexiblesMenu/>
                    :
                    <DateFixesMenu/>
                }
                
            </DatesFlexiblesContext.Provider>

            
        </div>
    )
}

