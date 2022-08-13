import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'

import Layout from '../Layout'

import Card from './components/Card'

import * as userActions from '../../store/actions/user'
import { linkDict } from '../../routes'
import { useNavigate } from 'react-router-dom'
import { iconsUnit } from 'components/Icons'
import { UnitName } from 'consts/user.ts'
import { accessPage } from '../../configs/access'
import CardLine from 'pages/Start/components/Card/CardLine.tsx'

const StartPage = ({ dispatch, user, application }) => {
    const navigate = useNavigate()

    const initUser = useCallback(() => {
        if (user?.id) {
            dispatch(userActions.getPrava({ id: user?.id }))
            dispatch(userActions.getUch({ id: user?.id }))
        }
    }, [user?.id])

    useEffect(() => {
        initUser()
    }, [user?.id])

    const handleSelectUnit = (unit) => {
        dispatch(userActions.setCurrentPodr(unit))
        navigate(linkDict.findPatient)
    }

    const unitFilter = (units) =>
        units.filter(v => user?.access?.[v.unit])

    const unitListFiltered = unitFilter(accessPage.dispanser)

    return <Layout>
        <div className="d-flex justify-content-center flex-column align-items-center">
            {unitListFiltered.length ? unitListFiltered.map((v, i) => <div key={i} style={{minWidth: 600, maxWidth: 800}}>
                    <CardLine key={i} title={UnitName[v.unit]} img={iconsUnit[v.unit]}
                              onClick={_ => handleSelectUnit(v.unit)}/>
                </div>
            ) : <h5>Нет доступных подразделений</h5>}

        </div>
    </Layout>
}

export default connect((state) => ({
    user: state.user,
    application: state.application
}))(StartPage)
