import { TEMP_DOWN } from '../constants/actionTypes';

const doTempDOWN = params => ({
        type: TEMP_DOWN,
        params,
});

export { 
    doTempDOWN,
};
