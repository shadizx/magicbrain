import React from "react";
import "./ImgForm.css";

const ImgForm = ({ onInputChange, onButtonSubmit, onEnterPress }) => {
    return (
        <div>
            <p className="f3">
                {'Enter a picture and I will detect the faces!'} <br />
                {'Give it a try by entering a URL below'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input
                        className="f4 pa2 w-70 center"
                        type='tex'
                        onChange={onInputChange}
                        onKeyDown={onEnterPress}
                    />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImgForm;