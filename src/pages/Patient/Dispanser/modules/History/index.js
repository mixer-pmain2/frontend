import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as patientActions from "store/actions/patient"

import Table from "components/Table";
import {formatDate, shorty} from "utility/string";
import {loadingAdd, loadingRemove} from "store/actions/application";


const LOADING_VISIT = "history_visit"
const LOADING_HOSPITAL = "history_hospital"


const HistoryVisit = ({patient, loading}) => {
    const [selectRow, setSelectRow] = useState(patient?.visit?.[0])
    const mapper = (row) => {
        return <>
            <td>
                {formatDate(row.date)}
            </td>
            <td>
                {row.dockName}
            </td>
            <td>
                {row.diag}
            </td>
            <td>
                {row.reason}
            </td>
        </>
    }

    return <div>
        <span>Диагноз приема </span><span title={selectRow?.diagS}>{shorty(selectRow?.diagS, 115)}</span>
        <Table
            columns={["Дата", "Врач", "Диагноз", "Причина"]}
            data={patient.visit || []}
            mapper={mapper}
            loading={loading}
            selecting={true}
            onClick={setSelectRow}
        />
    </div>
}

const HistoryHospital = ({patient, loading}) => {
    const [selectRow, setSelectRow] = useState(patient?.visit?.[0])
    const mapper = (row) => {
        return <>
            <td>
                {formatDate(row.dateStart)}
            </td>
            <td>
                {formatDate(row.dateEnd)}
            </td>
            <td>
                {row.otd}
            </td>
            <td>
                {row.diagStart}
            </td>
            <td>
                {row.diagEnd}
            </td>
        </>
    }

    return <div>
        <span>Диагноз выписки </span><span title={selectRow?.diagEndS}>{shorty(selectRow?.diagEndS)}</span>
        <Table
            columns={["Дата поступления", "Дата выписки", "Отделение", "Диагноз поступления", "Диагноз выписки"]}
            data={patient?.hospital || []}
            mapper={mapper}
            selecting={true}
            loading={loading}
            onClick={setSelectRow}
        />

    </div>
}

const History = ({dispatch, patient}) => {
    const [state, setState] = useState({
        isLoadingVisit: false,
        isLoadingHospital: false
    })

    useEffect(() => {
        if (!patient?.visit) {
            setState({
                ...state,
                isLoadingVisit: true,
            })
            dispatch(loadingAdd(LOADING_VISIT))
            dispatch(patientActions.getHistoryVisits({id: patient.id}))
                .finally(_ => {
                    dispatch(loadingRemove(LOADING_VISIT))
                    setState({
                        ...state,
                        isLoadingVisit: false,
                    })
                })
        }
        if (!patient?.hospital) {
            setState({
                ...state,
                isLoadingHospital: true
            })
            dispatch(loadingAdd(LOADING_HOSPITAL))
            dispatch(patientActions.getHistoryHospital({id: patient.id}))
                .finally(_ => {
                    dispatch(loadingRemove(LOADING_HOSPITAL))
                    setState({
                        ...state,
                        isLoadingHospital: false
                    })
                })
        }

    }, [])

    useEffect(() => {
        console.log(patient)
    })

    return <div>
        <div style={{marginBottom: 20}}>
            <HistoryVisit patient={patient} loading={state.isLoadingVisit}/>
        </div>
        <div>
            <HistoryHospital patient={patient} loading={state.isLoadingHospital}/>
        </div>
    </div>
}

export default connect(state => ({
    patient: state.patient,
    application: state.application
}))(History)
