import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEuroSign, faMobile, faCodeBranch, faChargingStation } from '@fortawesome/free-solid-svg-icons';

const About = () => {

    return (
        <div className="container">
            <br />

            <div className="card">

                <div className="card-header">
                    <h1>
                        <small className="text-info">A propos</small>
                    </h1>
                </div>

                <div className="card-body">
                    <h5>
                        Vivez plus sereinement l'aventure de la conduite électrique                    
                        <br /><br />
                        Ce "relaxateur" ZOE permet de faire baisser la pression et l'angoisse de la panne que ressentent souvent les conducteurs de véhicules électriques, en estimant l'autonomie et le temps de recharge, ainsi que le nombre de bornes à proximité d'un lieu d'arrivée. 
                    </h5>    
                    <br />

                    <FontAwesomeIcon icon={ faMobile } style={{ marginRight: 10 }} />
                    Epinglez l'App sur votre "Homescreen" afin de pouvoir y accéder plus facilement
                    <br />
                </div>

                <div className="card-footer">
                    <pre>
                        <i>Application non-officielle, <br />
                            développé pour un usage personnel<br /> 
                            par un utilisateur de ZOE 4.0
                        </i>
                    </pre>

                    <FontAwesomeIcon icon={ faInfoCircle } style={{ marginRight: 10 }} />
                    L'estimation de l'autonomie est approximative. Elle est calculée à partir de données trouvées sur le net.<br />

                    <FontAwesomeIcon icon={ faEuroSign } style={{ marginRight: 10 }} />
                    Le tarif EDF utilisé pour estimer le coût d'une charge est de 0.15 €/kWh en heures pleines.<br />

                    <FontAwesomeIcon icon={ faChargingStation } style={{ marginRight: 10 }} />
                    La liste des bornes est basée sur le fichier consolidé 
                    des bornes de recharge <a href='https://www.data.gouv.fr/fr/datasets/fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques/#' target="_blank" rel="noopener noreferrer">
                        IRVE (Août 2019)
                    </a>.
                    <br /><br />

                    <FontAwesomeIcon icon={ faCodeBranch } style={{ marginRight: 10 }} />
                    Code source disponible 
                    sur <a href='https://github.com/philippe-nougaillon/AutonomieZoe_ReactRedux' target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>

            </div>
            <br />
        </div>
    )}

export default (About);
