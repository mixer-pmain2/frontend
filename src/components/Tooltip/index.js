import React from "react";
import ReactTooltip from "react-tooltip";
import {styles} from "styles/index";

export const TooltipTypes = {
    dark: "dark",
    success: "success",
    warning: "warning",
    error: "error",
    info: "info",
    light: "light",
    primary: "primary"
}

const Tooltip = ({body, id, type = TooltipTypes.info}) => {

    let customStyle = null

    switch (type) {
        case TooltipTypes.primary:
            customStyle = {
                border: true,
                textColor: styles.primary.color,
                borderColor: styles.primary.color,
                backgroundColor: "white",
                effect:'solid'
            }

            break;
        default:
            customStyle = null
    }

    return <ReactTooltip
        className={'custom-color'}
        type={customStyle ? null : type}
        id={id}
        place={"top"}
        {...customStyle}
    >
        {body}
    </ReactTooltip>

}

export default Tooltip
