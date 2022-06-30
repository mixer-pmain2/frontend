import * as React from "react";

type PageTitleProps = {
    title: string
}

export const PageTitleLvl2 = ({title}: PageTitleProps) => {
    return <h5 className="mb-3">{title}</h5>
}

export const PageTitle = ({title}: PageTitleProps) => {
    return <h3 className="mb-4">{title}</h3>
}
