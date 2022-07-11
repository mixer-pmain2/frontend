import React, { useState } from 'react'
import { connect } from 'react-redux'

import Menu from './Menu/Menu'
import Visit from './modules/Visit'
import History from './modules/History'
import Custody from './modules/Custody'
import GroupWork from './modules/GroupWork'
import Invalid from './modules/Invalid'
import Uchet from './modules/Uchet'
import Vaccinations from './modules/Vaccinations'
import Infection from './modules/Infection'
import UKL from './modules/UKL'
import Prof from './modules/Prof'
import Ood from "./modules/Ood";

import { dispanserSubModules } from 'consts/app'
import Section23 from 'pages/Patient/Dispanser/modules/Section23'
import Passport from 'pages/Patient/Dispanser/modules/Passport'
import Section22 from 'pages/Patient/Dispanser/modules/Section22'

const AmbTabs = [
    dispanserSubModules.history,
    dispanserSubModules.visit,
    dispanserSubModules.prof,
    dispanserSubModules.uchet,
    dispanserSubModules.invalid,
    dispanserSubModules.custody,
    // dispanserSubModules.groupWork,
    dispanserSubModules.vaccinations,
    dispanserSubModules.infection,
    // dispanserSubModules.section23,
    // dispanserSubModules.UKL,
    dispanserSubModules.passport,
    dispanserSubModules.section22,
    dispanserSubModules.ood
]

type DispanserProps = {
    patient: PatientStore
    user: UserStore
}

const Dispanser = (props: DispanserProps) => {
    const { patient, user } = props
    const [currentTab, setCurrentTab] = useState(-1)

    const tabsFilter = (tabs) => {
        return tabs.filter(v =>
            ((v.unit & user.unit) || (v.unit === 0)) &&
            ((v.access & user.access[user.unit]) || (v.access === 0)) &&
            [Boolean(patient.id), false].indexOf(v.patientRequire) + 1)
    }

    return <div>
        {<Menu
            tabs={tabsFilter(AmbTabs)}
            curTab={currentTab}
            onChange={setCurrentTab}
            style={{ marginBottom: 20 }}
        />}
        {currentTab === dispanserSubModules.visit.id && <Visit/>}
        {currentTab === dispanserSubModules.prof.id && <Prof/>}
        {currentTab === dispanserSubModules.history.id && <History/>}
        {currentTab === dispanserSubModules.uchet.id && <Uchet/>}
        {currentTab === dispanserSubModules.invalid.id && <Invalid/>}
        {currentTab === dispanserSubModules.custody.id && <Custody/>}
        {currentTab === dispanserSubModules.groupWork.id && <GroupWork/>}
        {currentTab === dispanserSubModules.vaccinations.id && <Vaccinations/>}
        {currentTab === dispanserSubModules.infection.id && <Infection/>}
        {currentTab === dispanserSubModules.UKL.id && <UKL/>}
        {currentTab === dispanserSubModules.section23.id && <Section23/>}
        {currentTab === dispanserSubModules.passport.id && <Passport/>}
        {currentTab === dispanserSubModules.section22.id && <Section22/>}
        {currentTab === dispanserSubModules.ood.id && <Ood/>}
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user
}))(Dispanser)