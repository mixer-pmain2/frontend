import React from "react";
import Icons from "components/Icons";
import Tooltip, {TooltipTypes} from "../Tooltip";

type ButtonProps = {
    children?: React.ReactNode
    disabled?: boolean
    tooltip?: string
} & React.ButtonHTMLAttributes<any>

const Button = (props: ButtonProps) => {
    return <>
        <button
            {...props} className={`btn ${props.className}`} disabled={props.disabled}
            data-tip
            data-for={`Button${props.tooltip}`}
        >
            {props.children}
        </button>
        {props.tooltip && <Tooltip
            type={TooltipTypes.primary}
            body={<span>{props.tooltip}</span>}
            id={`Button${props.tooltip}`}
        />}
    </>
}

export const ButtonRemove = (props: ButtonProps) => {
    return <Button {...props} style={{padding: 0}}>{Icons.event.remove}</Button>
}

export default Button
