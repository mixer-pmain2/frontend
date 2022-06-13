import React, {useEffect} from "react";
import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";
import {getInfection} from "store/actions/patient";
import Table from "components/Table";
import {connect} from "react-redux";
import {formatDate} from "utility/string";


const mapper = row => <>
    <td>{formatDate(row.date)}</td>
    <td>{row.diagnose}</td>
</>

type InfectionProps = {
    dispatch: any
    patient: PatientStore
}

const Infection = (p: InfectionProps) => {
    const {dispatch, patient} = p
    useEffect(() => {
        dispatch(getInfection({patientId: patient.id}))

    }, [])
    return <div>
        <PageTitle title={dispanserSubModules.infection.title}/>
        <Table
            columns={["Дата", "Вид ифекционного заболевания"]}
            mapper={mapper}
            data={patient.infection || []}
        />
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient
}))(Infection)
