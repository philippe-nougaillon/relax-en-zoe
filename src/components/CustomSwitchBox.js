import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

class CustomSwitchBox extends Component {
    render() {

        const { label, value, onChange } = this.props;
        
        return (
            <h3>
                <div className="btn-group">
                    <span style={{ padding: 10, width: 250, textAlign: "center"}}>
                        <span className="text-info">
                            <small>
                                <FontAwesomeIcon icon={ faSun } style={{ marginRight: 10 }} />
                                { label }
                            </small>
                        </span>
                        <br />
                        
                        <input type="checkbox" 
                                className="custom-control-input" 
                                id="switch1"
                                checked={ value } 
                                onChange={ onChange }
                        />

                        <label className="custom-control-label" htmlFor="switch1">
                            { value ? "allumé" : "éteint" }
                        </label>
                    </span>
                </div>
            </h3>
        );
    }
}

export default CustomSwitchBox;
