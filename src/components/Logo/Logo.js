import React from "react";
import Tilt from 'react-parallax-tilt';
import LogoImg from './Logo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0 center">
            <Tilt className="Tilt br2 shadow-2" style={{ height: '100px', width: '100px'}}>
            <div className='pa3'>
                <img style={{paddingTop: '1px'}} alt='logo' src={LogoImg}/>
            </div>
            </Tilt>
        </div>
      );
}

export default Logo;