import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

class CustomSwitchBox extends Component {
    render() {
        const { children, label, value, onChange } = this.props;
        return (
            <div>
                <h3>
                    <small className="text-info">
                        <FontAwesomeIcon icon={ faSun } style={{ marginRight: 10 }} />
                        { label }
                    </small>
                    <br />

                    <div className="custom-control custom-switch"
                        style={{ marginLeft: 85 }} >
                        <input type="checkbox" 
                                className="custom-control-input" 
                                id="switch1"
                                checked={ value } 
                                onChange={ onChange }
                        />
                        <label className="custom-control-label" htmlFor="switch1">
                            <small>{ children }</small>
                        </label>
                    </div>
                </h3>
            </div>
        );
    }
}

export default CustomSwitchBox;