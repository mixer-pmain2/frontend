import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'

import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";
import EvaluationUKL from "./EvaluationUKL";
import User from "classes/User";
import {Unit} from "consts/user";
import Application from "../../../../../classes/Application";
import EvaluationSuicideUKL from "./EvaluationSuicideUKL";
import EvaluationPsychotherapyUKL from "./EvaluationPsychotherapyUKL";

type UKLProps = {
    dispatch?
    user: UserStore
    patient: PatientStore
    application: ApplicationStore
    onClose?
}

const UKL = (p: UKLProps) => {
    const u  = new User(p.user)
    const app = new Application(p.application)

    const isEnabled = () => app.getParam("UKL_DISP_ENABLE").paramI !== 0

    return <div>
        <PageTitle title={dispanserSubModules.UKL.title}/>
        {!isEnabled() && <div>
            Ввод УКЛ закрыт, обратитесь в отдел АСУ.
        </div>}
        {isEnabled() && (!u.isUnit(Unit.Психотерапия) && !u.isUnit(Unit.Суицидология)) && <EvaluationUKL {...p}/>}
        {isEnabled() && u.isUnit(Unit.Суицидология) && <EvaluationSuicideUKL {...p}/>}
        {isEnabled() && u.isUnit(Unit.Психотерапия) && <EvaluationPsychotherapyUKL {...p}/>}
    </div>
}

export default connect((state: RootStore) => ({
    user: state.user,
    patient: state.patient,
    application: state.application
}))(UKL)
