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

        document.querySelector(".overlay").style.display = "unset";
    }
    
    const [dateType,setDateType] = useState("fixes");// ou flexibles
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
                    document.querySelector(".overlay").style.display = "none";
            }  

            
        })

        window.addEventListener("keyup",(e)=>{
            if (!alreadyOpenedMenuEscape) return; 
            if (e.key=="Escape") {                
                document.querySelector(".filter").classList.add("inactive");
                document.querySelector(".filter-menu-section").classList.add("inactive");
                document.querySelector(".filter").classList.remove("active");
                document.querySelector(".filter-menu-section").classList.remove("active");

                document.querySelector(".overlay").style.display = "none";
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

                document.querySelector(".overlay").style.display = "none";
            }
        })


    },[])
  
return (
    <>
        <div className="header-top">
            <p>D??couvrez le nouvel Airbnb</p>
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
                        >N'importe o??</li>
                        
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
                        }}
                    ></div>
                </div>
      
                <div className="userInfo">
                    <img src="/images/user.svg" alt="" />
                    <div className="hamburger">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><g fill="none" fill-rule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
                    </div>
                </div>
          </div>
          <div className="filter-menu-section">
                <ul>
                    <li>Logements</li>
                    <li>Exp??riences</li>
                    <li>Exp??riences en ligne</li>
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