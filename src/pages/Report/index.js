import React, { useState } from 'react'
import { connect } from 'react-redux'
import { appPages } from 'consts/app'
import { PageTitle } from 'components/Title'
import Layout from 'pages/Layout'
import SubMenu from 'components/SubMenu'
import Jobs from 'pages/Report/Jobs'
import Order from 'pages/Report/Order.tsx'

const tabs = [{
    id: 1,
    title: 'Список отчетов'
}, {
    id: 2,
    title: 'Заказать отчет'
}]

const Report = ({ dispatch, user }) => {
    const t = appPages.report
    const [curTab, setCurTab] = useState(tabs[0].id)

    return <Layout>
        <PageTitle title={t.title}/>
        <SubMenu
            style={{marginBottom: 15}}
            tabs={tabs}
            curTab={curTab}
            onChange={setCurTab}
            tooltip={false}
        />
        {tabs[0].id === curTab && <Jobs/>}
        {tabs[1].id === curTab && <Order/>}
    </Layout>
}

export default connect(state => ({
    user: state.user
}))(Report)
