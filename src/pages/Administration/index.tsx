import React, {useState} from "react";
import {connect} from "react-redux";
import {PageTitle} from "../../components/Title";
import Layout from "../Layout";
import {appPages} from "../../consts/app";
import {iota} from "../../utility/app";
import LocationDoctor from "./LocationDoctor";
import SubMenu from "../../components/SubMenu";
import UserAccess from "./UserAccess";
import RateAllocation from "./RateAllocation";
import ThisDoctor from "./ThisDoctor";
import EnterSprav from "./EnterSprav";
import LeadSection from "./LeadSection";


const tabs: Tab[] & {component?} = [
    {
        id: iota(),
        title: "Распределение врачей",
        component: LocationDoctor
    },
    // {
    //     id: iota(),
    //     title: "Права пользователей",
    //     component: UserAccess
    // },
    {
        id: iota(),
        title: "Распределение ставок",
        component: RateAllocation
    },
    // {
    //     id: iota(),
    //     title: "Определение врачей",
    //     component: ThisDoctor
    // },
    // {
    //     id: iota(),
    //     title: "Ввод справки",
    //     component: EnterSprav
    // },
    {
        id: iota(),
        title: "Ответственный за участок",
        component: LeadSection
    }
]

export type AdministrationProps = {
    dispatch
    user: UserStore
    application: ApplicationStore
}

const Administration = (p: AdministrationProps) => {
    const [curTab, setCurTab] = useState(tabs[0].id)


    return <Layout>
        <PageTitle title={appPages.administration.title}/>
        <SubMenu style={{marginBottom: 20}} tabs={tabs} curTab={curTab} onChange={setCurTab} tooltip={false}/>
        {tabs.map((v, i) => {
            if (v.id === curTab) return <v.component key={i} {...p} title={v.title}/>
        })}
    </Layout>
}

export default connect((state: RootStore) => ({
    user: state.user,
    application: state.application
}))(Administration)

