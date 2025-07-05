import React, { useEffect, useState } from "react";
// import bowserCart from '../images/bowserOrnament.png';
import { imageZoom, magnify } from "../constants/functions";

const Zoom = ({ image }) => {

    useEffect(() => {
        imageZoom(imageId, resultId)
    }, [imageZoom])

    // useEffect(() => {
    //     magnify(imageId, 3)
    // }, [magnify])

    const [imageId, setImageId] = useState('myimage')
    const [resultId, setResultId] = useState('myresult')

    return (
        <>
            <div className="img-zoom-container">
                <img id={imageId} src={image} width="340" height="280" alt="zoom" />
                <div id={resultId} className="img-zoom-result"></div>
            </div>

            {/* <div class="img-magnifier-container">
                <img id="myimage" src={image} width="500" height="400" alt="Girl" />
            </div> */}
        </>
    )
}

export default Zoom