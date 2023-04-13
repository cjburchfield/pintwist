import React, { useEffect } from "react";
import "./PinIndex.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPins, getPins } from "../../store/pins";
import { Link } from "react-router-dom";


// const PinIndex = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchAllPins());
//     }, [dispatch]);

//     const pins = useSelector(getPins);

//     return (
//         <div id="pins-home-page">
//             <div id="pins-holder">
//                 {pins.map((pin) => 
//                     <div className="pin-index-item">
//                         <Link to={`/pin/${pin.id}`}>
//                             <img 
//                                 className="pin-index-item-image"
//                                 src={pin?.pinPhoto}
//                             />
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }    



// export default PinIndex;

const PinIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPins());
    }, [dispatch]);

    const pins = useSelector(getPins);

    return (
        <div id="pins-home-page">
            <div id="pins-holder">
                {pins.map((pin) => 
                    <div className="pin-index-item" key={`${pin.id}-${Date.now()}`}>
                        <Link to={`/pin/${pin.id}`}>
                            <img 
                                className="pin-index-item-image"
                                src={pin?.pinPhoto}
                            />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
} 

export default PinIndex;