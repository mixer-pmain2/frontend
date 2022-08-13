import React from "react";

type UKLGroupItemsProps = {
    title?: string
    children?
}

const UKLGroupItems = ({children, title}: UKLGroupItemsProps) => {
    return <div
        className="d-flex flex-column justify-content-between"
        style={{
            marginBottom: 15,
            width: "100%",
        }}
    >
        <h5>{title}</h5>
        {children}
        <hr/>
    </div>
}

export default UKLGroupItems
