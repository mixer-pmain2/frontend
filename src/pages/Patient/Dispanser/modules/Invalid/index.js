import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {getInvalid} from "store/actions/patient";

import Table from "components/Table";
import {PageTitle} from "components/Title";
import Icons from "components/Icons";

import {formatDate} from "utility/string";
import {dispanserSubModules} from "consts/app";
import {Access} from "consts/user";


const Invalid = ({dispatch, patient, user}) => {
    const [state, setState] = useState({
        isAccessed: Boolean(user.access[user.unit] & Access.dispanser["Работа с инвалидностью"])
    })

    useEffect(() => {
        dispatch(getInvalid({patientId: patient.id}))
    }, [])

    const mapper = (v) => <>
        <td>{formatDate(v.dateBegin)}</td>
        <td>{formatDate(v.dateEnd)}</td>
        <td>{formatDate(v.dateChange)}</td>
        <td>{v.kindS}</td>
        <td>{v.reasonS}</td>
    </>

    return <div>
        <PageTitle title={dispanserSubModules.invalid.title}/>
        {state.isAccessed && <div className="d-flex flex-row">
            <button className="btn btn-outline-primary" style={{marginRight: 5}}>{Icons.event.add}</button>
            <button className="btn btn-outline-primary">Сдача документов</button>
        </div>}
        <Table
            columns={["Начало", "Конец", "Сдача док.", "Группа", "Причина"]}
            data={patient?.invalid || []}
            mapper={mapper}
        />
    </div>
}

export default connect(state => ({
    patient: state.patient,
    user: state.user
}))(Invalid)
