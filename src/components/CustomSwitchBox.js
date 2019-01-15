import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';


class CustomSwitchBox extends Component {
    render() {
        const { children, label, value, onChange } = this.props;
        return (
            <h3>
                <small className="text-info">
                    <FontAwesomeIcon icon={ faSun } style={{ marginRight: 10 }} />
                    { label }
                </small>
                <br />
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input  type="checkbox" 
                                className="form-check-input"
                                style={{ marginLeft: 85 }} 
                                checked={ value } 
                                onChange={ onChange }
                        />
                        <small>{ children }</small>
                    </label>
                </div>
            </h3>
        );
    }
}

export default CustomSwitchBox;
