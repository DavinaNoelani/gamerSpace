import React from "react";
import hearts from '../images/hearts.png'


const Footer = () => {

    return (

        <>
            <div className="footer-container footer">
                <div className="inner-footer ">
                    {/* <div></div> */}
                    <img src={hearts} className="footer-logo" alt="top" />
                    <div className="footer-text">GamerSpace</div>
                    <img src={hearts} className="footer-logo" alt="top" />

                </div>
            </div>
        </>
    )
}

export default Footer