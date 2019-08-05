import React from 'react';
import { connect } from 'react-redux';

import { doSpeedUP } from '../actions/speedUp';
import { doSpeedDOWN } from '../actions/speedDown';
import { doTempUP } from '../actions/tempUp';
import { doTempDOWN } from '../actions/tempDown';
import { doHeaterSWITCH } from '../actions/heaterSwitch';

import { faTachometerAlt, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import CustomButtonBox from '../components/CustomButtonBox'; 
import CustomSwitchBox from '../components/CustomSwitchBox'; 
import Header from './AutonomieHeader';


function mapStateToProps(state) {
    return {
        params: state.paramsState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSpeedUP: () => dispatch(doSpeedUP()),
        onSpeedDOWN: () => dispatch(doSpeedDOWN()),
        onTempUP: () => dispatch(doTempUP()),
        onTempDOWN: () => dispatch(doTempDOWN()),
        onHeaterSWITCH: () => dispatch(doHeaterSWITCH()),
    }
}

const Autonomie = ({ params, onSpeedUP, onSpeedDOWN, onTempUP, onTempDOWN, onHeaterSWITCH }) => {

    const { speed, temp, heater } = params;

    return (
        <div className="container">
            <br />

            <div className="card">

                <Header />

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
                    </CustomSwitchBox>
                </div>
                <div className="card-footer">
                    <small>Consommation électrique estimée: ~{ params.consommation | 0 } kWh </small>
                </div>
            </div>
        </div>
    )}

export default connect(mapStateToProps, mapDispatchToProps)(Autonomie);
