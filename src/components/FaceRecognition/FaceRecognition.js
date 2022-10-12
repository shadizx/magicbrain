import React from "react";

const FaceRecognition = ({ imageUrl, faces }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                { faces }
            </div>
        </div>
    );
}

export default FaceRecognition;