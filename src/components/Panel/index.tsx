import React from "react";


type PanelProps = {
    title?: string
    children: React.ReactNode
    className?: string
    childrenClass?: string
    style?
}

const Panel = ({title, children, className, childrenClass="", style={}}: PanelProps) => {

    return <div className={`card ${className ? className : ""}`} style={style}>
        {title && <div className="card-header">
            {title}
        </div>}
        <div className={`card-body ${childrenClass}`}>
            {children}
        </div>
    </div>
}

export default Panel
