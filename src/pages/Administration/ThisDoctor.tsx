import React from "react";
import {AdministrationProps} from "./index";
import {PageTitleLvl2} from "../../components/Title";


const ThisDoctor = (p: AdministrationProps & { title }) => {

    return <div>
        <PageTitleLvl2 title={p.title}/>
        5
    </div>
}

export default ThisDoctor
