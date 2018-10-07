import React, {Component} from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: props.details,
        }
    }

    render() {
        const {
            title,
            link,
            body
        } = this.props.details;

        return (
            <div id="overlay">
                <div className="container">
                    <div className="modal-close" onClick={() => this.props.onClose()}>
                        <svg fill='#000000'
                             height='24'
                             viewBox='0 0 24 24'
                             width='24'
                             xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
                            <path d='M0 0h24v24H0z' fill='none'/>
                        </svg>
                    </div>
                    <div className="modal-title">
                        <a href={link} target="_blank" dangerouslySetInnerHTML={{__html: title}}/>
                    </div>
                    <div className="modal-content" dangerouslySetInnerHTML={{__html: body}}/>
                </div>
            </div>
        );
    }
}

export default Modal;
