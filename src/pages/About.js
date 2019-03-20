import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faLightbulb, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

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
                    <h4>
                        Estimer l'autonomie, le temps de charge et trouver une borne à proximité, 
                        c'est ce qu'essaye de faire cet outil, développé pour un usage personnel 
                        par un utilisateur de la Renault ZOE 4.0
                    </h4>
                    <br />

                    <FontAwesomeIcon icon={ faInfoCircle } style={{ marginRight: 10 }} />

                    L'estimation de l'autonomie est approximative. Elle est calculée à partir de données trouvées sur le net.<br />

                    Le tarif EDF utilisé pour estimer le coût d'une charge est de 0.15 €/kWh en heures pleines.<br />

                    La liste des bornes est basée sur le fichier consolidé 
                    des bornes de recharge <a href='https://www.data.gouv.fr/fr/datasets/fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques/#' target="_blank" rel="noopener noreferrer">
                        IRVE (mars 2019)
                    </a>.
                    <br /><br />

                    <FontAwesomeIcon icon={ faCodeBranch } style={{ marginRight: 10 }} />
                    Le code source de l'application est disponible 
                    sur <a href='https://github.com/philippe-nougaillon/AutonomieZoe_ReactRedux' target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <br /><br />

                    <FontAwesomeIcon icon={ faLightbulb } style={{ marginRight: 10 }} />
                    Epinglez l'app sur votre "Homescreen" afin de pouvoir y accéder plus facilement
                </div>

                <div className="card-footer">
                    <pre>
                        <i>Application non-officielle</i>
                    </pre>
                </div>

            </div>
        </div>
    )}

export default (About);
