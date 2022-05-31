import React from "react";
import Tooltip, {TooltipTypes} from "components/Tooltip";


const SubMenu = ({tabs, onChange, curTab, style}) => {
    style = {...style, cursor: "pointer"}
    return <ul className="nav nav-tabs" style={{...style}}>
        {
            tabs.map((v, i) => {
                const isActive = curTab === v.id
                return <li className="nav-item" key={i}>
                    <a
                        className={`nav-link ${isActive && "active"}`}
                        aria-current="page"
                        onClick={_ => onChange(v.id)}
                        data-tip
                        data-for={`bnt${i}`}
                    >
                        {/*<span style={{marginRight: 5}}>{v.title}</span>*/}
                        {v.img ? v.img : v.title}

                    </a>
                    <Tooltip
                        type={TooltipTypes.primary}
                        body={<span>{v.title}</span>}
                        id={`bnt${i}`}
                    />
                </li>
            })
        }

    </ul>
}

export default SubMenu
