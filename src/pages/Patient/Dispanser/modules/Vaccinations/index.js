import React from "react";
import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";


const Vaccinations =() => {
    return <div>
        <PageTitle title={dispanserSubModules.vaccinations.title}/>
        Vaccinations
    </div>
}

export default Vaccinations
