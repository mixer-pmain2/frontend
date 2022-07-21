import React, {useState} from "react";
import {styles} from "../../../../styles";

const CardLine = ({title, img, onClick}) => {
    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }

    const styleWrapper = hover
        ? {
            borderLeftWidth: 5,
            borderLeftColor: styles.primary.borderColor,
            paddingLeft: 15,
        }
        : {
            borderLeftWidth: 1,
            paddingLeft: 14,
        }

    return <div className="mb-1 card" style={{cursor: "pointer", ...styleWrapper}}>
        <div className="d-flex flex-row justify-content-center align-items-center p-2" onClick={onClick}
             onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <img src={img.default} height={"40"} width={"40"} className="mt-2 mb-2" alt="..."            />
            <div className="w-100" style={{marginLeft: 15}}>
                <h5>{title}</h5>
            </div>
        </div>
    </div>
}

export default CardLine
