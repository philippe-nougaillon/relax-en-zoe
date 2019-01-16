import React from 'react';

import { faTachometerAlt, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import CustomButtonBox from './CustomButtonBox'; 
import CustomSwitchBox from './CustomSwitchBox'; 

const App = ({ params, onSpeedUP, onSpeedDOWN, onTempUP, onTempDOWN, onHeaterSWITCH }) => {

    const { speed, temp, heater, autonomie } = params;

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h1>
                        <small className="text-info">Autonomie*</small>
                        <br />
                        { autonomie | 0 }
                        <small> km</small>
                    </h1>
                </div>
                <div className="card-body">
                    <CustomButtonBox
                        icon={ faTachometerAlt }
                        value={ speed }
                        unit=" km/h"
                        onClickUP  ={ onSpeedUP }
                        onClickDOWN={ onSpeedDOWN }>
                        Vitesse
                    </CustomButtonBox>
                    
                    <CustomButtonBox
                        icon={ faTemperatureHigh }
                        value={ temp }
                        unit=" °C"
                        onClickUP  ={ onTempUP }
                        onClickDOWN={ onTempDOWN }>
                        Température
                    </CustomButtonBox>

                    <CustomSwitchBox
                        label="Chauffage" 
                        value={ heater }
                        onChange={ onHeaterSWITCH } >
                        Allumé
                    </CustomSwitchBox>
                </div>
                <div className="card-footer">
                    <pre>
                        * Autonomie estimée (ZOE 4.0)<br />
                        <a href="https://github.com/philippe-nougaillon/AutonomieZoe_ReactRedux">Code source</a>
                    </pre>
                </div>
            </div>
        </div>
    )}

export default App;