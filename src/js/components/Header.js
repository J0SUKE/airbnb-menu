import React, { useEffect, useState } from 'react'

export const HeaderContext = React.createContext();

function Header({children}) {
    
    function revealFilterMenu(event) 
    {
        alreadyOpenedMenuClick=true;
        alreadyOpenedMenuEscape=true;
        event.stopPropagation();
            
        document.querySelector(".filter").classList.remove("inactive");
        document.querySelector(".filter-menu-section").classList.remove("inactive");
        
        document.querySelector(".filter").classList.add("active");
        document.querySelector(".filter-menu-section").classList.add("active");
    }
    
    const [dateType,setDateType] = useState("flexibles");// ou fixes
    const[menu,setMenu] = useState(null);
    const[selectedZone,setSelectedZone] = useState(null);

    let headerContextValue = {
        selectedZone:selectedZone,
        setSelectedZone:setSelectedZone,
        menu:menu,
        setMenu:setMenu,
        setDateType:setDateType,
        dateType:dateType,
    }

    let alreadyOpenedMenuEscape = false;
    let alreadyOpenedMenuClick = false;

    useEffect(()=>{
        window.addEventListener("click",(e)=>{
            if (!alreadyOpenedMenuClick) return;
            
            if (!e.target.closest(".header") && !e.target.closest(".header-top")) 
            {
                    e.stopPropagation();
                    document.querySelector(".filter").classList.add("inactive");
                    document.querySelector(".filter-menu-section").classList.add("inactive");
                    document.querySelector(".filter").classList.remove("active");
                    document.querySelector(".filter-menu-section").classList.remove("active");
            }  
        })

        window.addEventListener("keyup",(e)=>{
            if (!alreadyOpenedMenuEscape) return; 
            if (e.key=="Escape") {                
                document.querySelector(".filter").classList.add("inactive");
                document.querySelector(".filter-menu-section").classList.add("inactive");
                document.querySelector(".filter").classList.remove("active");
                document.querySelector(".filter-menu-section").classList.remove("active");
            }
        })

        window.addEventListener("scroll",()=>{
            const{scrollTop} = document.documentElement;
            if (scrollTop>64 && document.querySelector(".filter-menu-section").classList.contains("active")) 
            {
                document.querySelector(".filter").classList.add("inactive");
                document.querySelector(".filter-menu-section").classList.add("inactive");
                document.querySelector(".filter").classList.remove("active");
                document.querySelector(".filter-menu-section").classList.remove("active");
            }
        })


    },[])
  
return (
    <>
        <div className="header-top">
            <p>Découvrez le nouvel Airbnb</p>
        </div>
        
        <div className="header">
          <div className="header__content">
                <div className="logo">
                    <img src="images/logo.svg" alt=""/>
                </div>    

                <div className="filter" onClick={(e)=>{revealFilterMenu(e)}}>
                    <ul>
                        <li
                            onClick={()=>{
                                setMenu("destination");
                                setSelectedZone("destination");
                                document.querySelector(".filter-menu li input").focus();
                            }}
                        >N'importe où</li>
                        
                        <li
                            onClick={()=>{
                                setMenu("duree");
                                setSelectedZone((dateType=="flexibles" ? "duree" :"arivee" ));
                            }}
                        >Une semaine</li>
                        
                        <li className="empty"
                            onClick={()=>{
                                setMenu("voyageurs");
                                setSelectedZone("voyageurs")
                            }}
                        >Ajouter des voyageur</li>
                    </ul>
                    <div className="search-btn"
                        onClick={()=>{
                            setMenu("destination");
                            setSelectedZone("destination");
                            // utiliser une ref vers le input sur lequel on mettra le focus ici
                        }}
                    ></div>
                </div>
      
                <div className="userInfo"></div>
          </div>
          <div className="filter-menu-section">
                <ul>
                    <li>Logements</li>
                    <li>Expériences</li>
                    <li>Expériences en ligne</li>
                </ul>
                <div className="filter-menu-section__content">
                    <HeaderContext.Provider value={headerContextValue}>
                        {children}    
                    </HeaderContext.Provider>
                </div>
          </div>
        </div>    
    </> 
  )
}

export default Header;