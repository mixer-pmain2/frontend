import React, {useState} from "react";
import {connect} from "react-redux";
import {subModules} from "consts/app";
import {PageTitle} from "components/Title";
import Layout from "pages/Layout";
import SubMenu from "components/SubMenu";

const tabs = [{
    id: 1,
    title: "Список отчетов"
}, {
    id: 2,
    title: "Заказать отчет"
}]

const Report = ({dispatch, user}) => {
    const t = subModules.report
    const [curTab, setCurTab] = useState(tabs[0].id)

    return <Layout>
        <PageTitle title={t.title}/>
        <SubMenu
            tabs={tabs}
            curTab={curTab}
            onChange={setCurTab}
            tooltip={false}
        />
    </Layout>
}

export default connect(state => ({
    user: state.user
}))(Report)
