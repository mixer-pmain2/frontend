import React, {useEffect} from "react";
import {connect} from 'react-redux'

import {PageTitle} from "components/Title";
import {dispanserSubModules, loadComponent} from "consts/app";
import Table from "components/Table";
import {getVaccination} from "store/actions/patient";
import {formatDate} from "utility/string";
import {useLoading} from "../../../../../components/Progress";

const mapper = row => <>
    <td>{formatDate(row.date)}</td>
    <td>{row.vaccination}</td>
    <td>{row.number}</td>
    <td>{row.series}</td>
    <td>{row.result}</td>
    <td>{row.detached}</td>
</>

type VaccinationProps = {
    dispatch: any
    patient: PatientStore
}

const Vaccinations = (p: VaccinationProps) => {
    const {dispatch, patient} = p

    useEffect(() => {
        dispatch(getVaccination({patientId: patient.id}))

    }, [])


    return <div>
        <PageTitle title={dispanserSubModules.vaccinations.title}/>
        <Table
            columns={["Дата", "Прививка", "Номер", "Серия", "Результат", "Отвод"]}
            mapper={mapper}
            data={patient.vaccination|| []}
            loading={useLoading(loadComponent.history_vaccination)}
        />
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient
}))(Vaccinations)
