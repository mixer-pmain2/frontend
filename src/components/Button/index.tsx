import React from "react";
import Icons from "components/Icons";

type ButtonProps = {
    children?: React.ReactNode
    disabled?: boolean
} & React.ButtonHTMLAttributes<any>

const Button = (props: ButtonProps) => {
    return <button {...props} className={`btn ${props.className}`} disabled={props.disabled}>{props.children}</button>
}

export const ButtonRemove = (props: ButtonProps) => {
    return <Button {...props} style={{padding: 0}}>{Icons.event.remove}</Button>
}

export default Button
