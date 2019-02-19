import React, {Component} from 'react';

class CustomButton extends Component {
    render() {
        const { children, onClick } = this.props; 
        return (
            <button
                type="button"
                className="btn btn-outline-info"
                onClick={ onClick } >
                { children }
            </button>
        ); 
    }
}

export default CustomButton;
