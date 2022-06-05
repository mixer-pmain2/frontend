import React from "react";
import Icons from "components/Icons";

type ButtonProps = {
    children?: React.ReactNode
} & React.ButtonHTMLAttributes<any>

const Button = (props: ButtonProps) => {
    return <button {...props} className={`btn ${props.className}`}>{props.children}</button>
}

export const ButtonRemove = (props: ButtonProps) => {
    return <Button {...props} style={{padding: 0}}>{Icons.event.remove}</Button>
}

export default Button
