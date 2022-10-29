import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as patientActions from "store/actions/patient"
import * as appConst from "consts/app"

import Table from "components/Table";
import {formatDate, shorty} from "utility/string";
import {loadingAdd, loadingRemove} from "store/actions/application";
import {PageTitle} from "components/Title";
import { useLoading } from 'components/Progress'



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
    const [selectRow, setSelectRow] = useState(patient?.hospital?.[0])
    const mapper = (row: PatientHospitalStore) => {
        return <>
            <td>
                {row.otd}
            </td>
            <td>
                {formatDate(row.dateStart)}
            </td>
            <td>
                {formatDate(row.dateEnd)}
            </td>
            <td>
                {row.diagStart}
            </td>
            <td>
                {row.diagEnd}
            </td>
            <td>
                {row.historyNumber}
            </td>
            <td>
                {row.where}
            </td>
        </>
    }

    return <div>
        <span>Диагноз выписки </span><span title={selectRow?.diagEndS}>{shorty(selectRow?.diagEndS, 115)}</span>
        <Table
            columns={["Отделение", "Дата поступления", "Дата выписки", "Диагноз поступления", "Диагноз выписки", "№ ист.", "Куда выписан"]}
            data={patient?.hospital || []}
            mapper={mapper}
            selecting={true}
            loading={loading}
            onClick={setSelectRow}
        />

    </div>
}

const History = ({dispatch, patient, application}) => {

    useEffect(() => {
        if (!patient?.visit) {
            dispatch(patientActions.getHistoryVisits({id: patient.id}))
        }
        if (!patient?.hospital) {
            dispatch(patientActions.getHistoryHospital({id: patient.id}))
        }

    }, [])

    return <div>
        <PageTitle title={"История пациента"}/>
        <div style={{marginBottom: 20}}>
            <HistoryVisit patient={patient} loading={useLoading(appConst.loadComponent.history_visit)}/>
        </div>
        <div>
            <HistoryHospital patient={patient} loading={useLoading(appConst.loadComponent.history_hospital)}/>
        </div>
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    application: state.application
}))(History)
