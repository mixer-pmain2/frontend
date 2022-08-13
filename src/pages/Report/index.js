import React, { useState } from 'react'
import { connect } from 'react-redux'
import { appPages } from 'consts/app'
import { PageTitle } from 'components/Title'
import Layout from 'pages/Layout'
import SubMenu from 'components/SubMenu'
import Jobs from 'pages/Report/Jobs'
import Order from 'pages/Report/Order.tsx'
import { accessPage, isAccessedPage } from '../../configs/access'


const Report = ({ dispatch, user }) => {

    const tabs = [{
        id: 1,
        title: 'Список отчетов',
        accessed: true
    }, {
        id: 2,
        title: 'Заказать отчет',
        accessed: isAccessedPage(accessPage.reportOrder, user)
    }]

    const t = appPages.report
    const [curTab, setCurTab] = useState(tabs[0].id)

    return <Layout>
        <PageTitle title={t.title}/>
        <SubMenu
            style={{marginBottom: 15}}
            tabs={tabs.filter(v => v.accessed)}
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
