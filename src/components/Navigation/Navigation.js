import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    var output;
    
    if (isSignedIn) {
        output = (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    } else {
        output = (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('signup')} className="f3 link dim black underline pa3 pointer">Sign Up</p>
            </nav>
        )
    }
    return output;
}

export default Navigation;