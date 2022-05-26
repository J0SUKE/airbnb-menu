import React, { useState,useContext, useEffect } from "react"
import { FilterContext } from '../Filter';

let regions = [
    ["Je suis flexible","/images/world.jpg"],
    ["Afrique","/images/afrique.webp"],
    ["Italie","/images/italie.webp"],
    ["États-Unis","/images/usa.webp"],
    ["Espagne","/images/spain.webp"],
    ["Caraïbes","/images/caraibes.webp"],
]

export default function DestinationMenu() {
    
    const {destinatioValue,setDestinatioValue,setMenu,dateType,setSelectedZone} = useContext(FilterContext);
    const [propositions,setPropositions] = useState([]);
    const [region,setRegion] = useState("Je suis flexible");

    useEffect(()=>{
    
        fetch("https://countriesnow.space/api/v0.1/countries")
        .then(resp=>resp.json())
        .then(response=>{
            let count = 0;
            let propos =[];
            for (let i = 0; i < response.data.length; i++) 
            {
                if (count>=5) break;
                for (let j = 0; j < response.data[i].cities.length; j++) 
                {
                    if (count>=5) break;
                    if (response.data[i].cities[j].toLowerCase().startsWith(destinatioValue.toLowerCase())) 
                    {
                        propos.push(`${response.data[i].cities[j]} , ${response.data[i].country}`);    
                        count++;  
                    }
                }
            }
            setPropositions([...propos]);
        });
        

    },[destinatioValue])
    

    function selectOption(e,prop) {
        e.stopPropagation();
        setDestinatioValue(prop);
        setMenu("duree");
        setSelectedZone((dateType=="flexibles" ? "duree" :"arivee" ));
    }

    return (
      <div className="destination-menu">
          {
              //les cas ou on affiche le choix des regions : destinatioValue est vide 
              destinatioValue=="" ? 
                <div className="region-selection">
                <h2>Rechercher par région</h2>
                <ul>
                    {
                        regions.map((reg)=>{
                            //reg = ["nom de region" , url de l'image]
                            
                            return(
                                <li 
                                    className={region==reg[0] ? "active" : ""}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        setRegion(reg[0]);
                                        setDestinatioValue(reg[0]);
                                        setMenu("duree");
                                        setSelectedZone((dateType=="flexibles" ? "duree" :"arivee" ));
                                    }}
                                >
                                    <img src={reg[1]} alt=""/>
                                    <p>{reg[0]}</p>
                                </li>       
                            )
                        })
                    }
                </ul>
                    </div> 
                : 
                (propositions.length==0 ? 
                    null
                    :
                    <div className="manual-selection">
                        <ul>
                            {
                                propositions.map(prop=>{
                                    return(
                                        <li 
                                            key={Math.random()*100}
                                            onClick={(e)=>{selectOption(e,prop)}}
                                            >
                                            <div className="icon">
                                                <img src="/images/localisation.svg" alt=""/>
                                            </div>
                                            <p>{prop}</p>
                                        </li>        
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
          }
          
      </div>
    )
  }