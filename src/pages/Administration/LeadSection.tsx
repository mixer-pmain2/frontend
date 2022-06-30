import React from "react";
import {AdministrationProps} from "./index";
import {PageTitleLvl2} from "../../components/Title";


const LeadSection = (p: AdministrationProps & { title }) => {

    return <div>
        <PageTitleLvl2 title={p.title}/>
        7
    </div>
}

export default LeadSection
