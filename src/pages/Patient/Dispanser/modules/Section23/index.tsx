import React from "react";
import {connect} from "react-redux";

import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";


type Section23Props = {
    dispatch
    patient: PatientStore
    application: ApplicationStore
}

const Section23 = (p: Section23Props) => {

    return <div>
        <PageTitle title={dispanserSubModules.section23.title}/>
    </div>
}

export default connect((state: RootStore) => ({
    application: state.application,
    patient: state.patient
}))(Section23)
