import React from "react";


type PanelProps = {
    title?: string
    children: React.ReactNode
    className?: string
}

const Panel = ({title, children, className}: PanelProps) => {

    return <div className={`card ${className ? className : ""}`}>
        {title && <div className="card-header">
            {title}
        </div>}
        <div className="card-body">
            {children}
        </div>
    </div>
}

export default Panel
