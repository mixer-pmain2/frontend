import React, {useCallback, useEffect} from "react"
import {connect} from "react-redux";

import Layout from "../Layout";

import Card from "./components/Card";

import * as userActions from "../../store/actions/user";
import {linkDict} from "../../routes";
import {useNavigate} from "react-router-dom";
import {iconsUnit} from "components/Icons";
import { UnitName } from 'consts/user.ts'


const unitList = [
    {
        title: "Взрослая психиатрия",
        img: iconsUnit[1],
        unit: 1
    },
    {
        title: "Психотерапия",
        img: iconsUnit[2],
        unit: 2
    },
    {
        title: "Специалисты",
        img: iconsUnit[1024],
        unit: 1024
    },
    {
        title: "Суицидология",
        img: iconsUnit[4],
        unit: 4
    },
    {
        title: UnitName['2048'],
        img: iconsUnit['2048'],
        unit: 2048
    },
    {
        title: "ОИЛС",
        img: iconsUnit[8],
        unit: 8
    },
    {
        title: "Детский диспансер",
        img: iconsUnit[16],
        unit: 16
    },
    {
        title: "Подростковая психиатрия",
        img: iconsUnit[16777216],
        unit: 16777216
    },
    {
        title: "Детская консультация",
        img: iconsUnit[33554432],
        unit: 33554432
    }
]

const StartPage = ({dispatch, user, application}) => {
    const navigate = useNavigate()

    const initUser = useCallback(() => {
        if (user?.id) {
            dispatch(userActions.getPrava({id: user?.id}))
            dispatch(userActions.getUch({id: user?.id}))
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

    const unitListFiltered = unitFilter(unitList)
    return <Layout>
        <div className="row d-flex justify-content-center">
            {unitListFiltered.length ? unitListFiltered.map((v, i) =>
                <Card key={i} title={v.title} img={v.img} onClick={_ => handleSelectUnit(v.unit)}/>
            ) : <h5>Нет доступных подразделений</h5>}

        </div>
    </Layout>
}

export default connect((state) => ({
    user: state.user,
    application: state.application
}))(StartPage)
