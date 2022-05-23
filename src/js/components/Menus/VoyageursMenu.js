import React from "react";

export default function VoyageursMenu() {
    return(
        <div className="voyageurs-menu">
            <ul>
                <li>
                    <div>
                        <p>Adultes</p>
                        <span>13 ans et plus</span>
                    </div>
                    <div>
                        <button className="disabled">-</button>
                        <p>0</p>
                        <button>+</button>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Enfants</p>
                        <span>De 2 à 12 ans</span>
                    </div>
                    <div>
                        <button>-</button>
                        <p>0</p>
                        <button>+</button>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Bébés</p>
                        <span>- de 2 ans</span>
                    </div>
                    <div>
                        <button>-</button>
                        <p>0</p>
                        <button>+</button>
                    </div>
                </li>
                <li>
                    <div>
                        <p>Animaux domestiques</p>
                        <a href="">Vous voyagez avec un animal d'assistance ?</a>
                    </div>
                    <div>
                        <button>-</button>
                        <p>0</p>
                        <button>+</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}