import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CustomButton from './CustomButton'; 

class CustomButtonBox extends Component {
    render() {

        const { children, value, unit, icon, onClickUP, onClickDOWN} = this.props;

        return (
            <h3>
                <div className="btn-group">
                    <CustomButton onClick={ onClickDOWN } >-</CustomButton>

                    <span style={{ padding: 10, width: 200, textAlign: "center"}}>
                        <span className="text-info">
                            <small>
                                <FontAwesomeIcon icon={ icon } style={{ marginRight: 10 }} />
                                { children }
                            </small>
                        </span>
                        <br />
                        { value }
                        <small>{ unit }</small>
                    </span>
                    
                    <CustomButton onClick={ onClickUP } >+</CustomButton>
                </div>
            </h3>
        );
    }
}

export default CustomButtonBox;