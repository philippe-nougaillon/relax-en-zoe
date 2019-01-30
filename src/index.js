import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App'; 
import store from './store';

import { Provider, connect } from 'react-redux';

import { doSpeedUP } from './actions/speedUp';
import { doSpeedDOWN } from './actions/speedDown';
import { doTempUP } from './actions/tempUp';
import { doTempDOWN } from './actions/tempDown';
import { doHeaterSWITCH } from './actions/heaterSwitch';

function mapStateToProps(state) {
    return {
        params: state.paramsState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSpeedUP: () => store.dispatch(doSpeedUP()),
        onSpeedDOWN: () => store.dispatch(doSpeedDOWN()),
        onTempUP: () => store.dispatch(doTempUP()),
        onTempDOWN: () => store.dispatch(doTempDOWN()),
        onHeaterSWITCH: () => store.dispatch(doHeaterSWITCH(store.getState().paramsState)),
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);


// function render() {
//     ReactDOM.render(
//         <App
//             params = { store.getState().paramsState }
//             onSpeedUP   = { () => store.dispatch(doSpeedUP(store.getState().paramsState)) } 
//             onSpeedDOWN = { () => store.dispatch(doSpeedDOWN(store.getState().paramsState)) }     
            
//             onTempUP    = { () => store.dispatch(doTempUP(store.getState().paramsState)) } 
//             onTempDOWN  = { () => store.dispatch(doTempDOWN(store.getState().paramsState)) } 

//             onHeaterSWITCH  = { () => store.dispatch(doHeaterSWITCH(store.getState().paramsState)) }
//         />,
//         document.getElementById('root')
//     );
// }

// store.subscribe(render);
// render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
