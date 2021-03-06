import React, { useEffect, useState ,useContext} from 'react'
import DestinationMenu from './Menus/DestinationMenu';
import DureeMenu from './Menus/DureeMenu';
import VoyageursMenu from './Menus/VoyageursMenu';
import DureeZone from './Zones/DureeZone';
import DestinationZone from './Zones/DestinationZone';
import VoyageursZone from './Zones/VoyageursZone';
import { HeaderContext } from './Header';

export const FilterContext = React.createContext();

function Filter() {
    const{selectedZone,setSelectedZone,menu,setMenu,dateType,setDateType} = useContext(HeaderContext);
    const[typeFlexible,setTypeFlexible] = useState("Une semaine");
    const[months,setMonths] = useState({});
    const[voyageurs,setVoyageurs] = useState({
        adults:0,
        kids:0,
        babies:0,
        animals:0
    })
    const[datesFixes,setDatesFixes] = useState({
        depart:null,
        arivee:null    
    });

    const [dateFixeRange,setDateFixeRange] = useState(null);

    const[monthsList,setMonthsList] = useState([]);

    const [destinatioValue,setDestinatioValue] = useState("");

    let FilterContextValue = {
        setTypeFlexible,
        typeFlexible,
        setDateType,
        dateType,
        menu,
        setMenu,
        selectedZone,
        setSelectedZone,
        destinatioValue,
        setDestinatioValue,
        voyageurs,
        setVoyageurs,
        monthsList,
        setMonthsList,
        months,
        setMonths,
        datesFixes,
        setDatesFixes,
        dateFixeRange,
        setDateFixeRange
    }

    useEffect(()=>{
        [document.querySelector(".header"),document.querySelector(".header-top")].forEach(element => {
            
            element.addEventListener("click",(e)=>{
                if (!e.target.closest(".filter-menu")) {
                    setSelectedZone(null);
                    setMenu(null);
                }     
            })    
        });
    },[])

    // selectionne le menu a afficher en fonction de la zone selected
    let ActualMenu=(()=>{
        switch (menu) {
            case "destination":
                return <DestinationMenu/>
                break;
            case "voyageurs":
                return <VoyageursMenu/>
                break;
            case "duree":
                return <DureeMenu/>
                break;
            default:
                return null;
                break;
        }
    })();
    

    return (
        <div className={`filter-menu ${selectedZone==null ? "" : "active"}`}>
            <FilterContext.Provider value={FilterContextValue}>
                <ul>                  
                    <DestinationZone/>
                    <DureeZone/>
                    <VoyageursZone/>
                </ul>       
                {ActualMenu}     
            </FilterContext.Provider>
        </div>    
    )
}


export default Filter