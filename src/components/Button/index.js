import React from "react";
import Icons from "components/Icons";

const Button = (props) => {
    return <button {...props}>{props.children}</button>
}

export const ButtonRemove = (props) => {
    return <Button {...props} style={{padding: 0}}>{Icons.event.remove}</Button>
}

export default Button
