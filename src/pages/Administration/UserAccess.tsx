import React from "react";
import {AdministrationProps} from "./index";
import {PageTitleLvl2} from "../../components/Title";


const UserAccess = (p: AdministrationProps & { title }) => {

    return <div>
        <PageTitleLvl2 title={p.title}/>
        2
    </div>
}

export default UserAccess
