import React from 'react';
import { connect } from 'react-redux';

import { doSpeedUP } from '../actions/speedUp';
import { doSpeedDOWN } from '../actions/speedDown';
import { doTempUP } from '../actions/tempUp';
import { doTempDOWN } from '../actions/tempDown';
import { doHeaterSWITCH } from '../actions/heaterSwitch';

import { faTachometerAlt, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import CustomButtonBox from './CustomButtonBox'; 
import CustomSwitchBox from './CustomSwitchBox'; 
import Header from './Header';
import Footer from './Footer';

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

const App = ({ params, onSpeedUP, onSpeedDOWN, onTempUP, onTempDOWN, onHeaterSWITCH }) => {

    const { speed, temp, heater } = params;

    return (
        <div className="container">
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
                        Allumé
                    </CustomSwitchBox>
                </div>
                <Footer />
            </div>
        </div>
    )}

export default connect(mapStateToProps, mapDispatchToProps)(App);
