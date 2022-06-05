import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";

import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";
import {getCustody} from "store/actions/patient";
import Table from "components/Table";
import {formatDate} from "../../../../../utility/string";

const mapper = (row: CustodyData) =>
    <>
        <td>{row.dateStart ? formatDate(row.dateStart): ""}</td>
        <td>{row.dateEnd ? formatDate(row.dateEnd) : ""}</td>
        <td>{row.who}</td>
    </>

type CustodyData = {
    who: string,
    dateStart: string,
    dateEnd: string
}

type CustodyProps = {
    dispatch: any
    user: UserStore,
    patient: PatientStore
}

const Custody = ({dispatch, user, patient}: CustodyProps) => {
    const [custodyData, setCustodyData] = useState<CustodyData[]>([])

    useEffect(() => {
        dispatch(getCustody({patientId: patient.id}))
            .then(res => {
                setCustodyData(res)
            })

    }, [])

    return <div>
        <PageTitle title={dispanserSubModules.custody.title}/>
        <Table
            columns={["Дата лишения", "Дата отмены", "Наличие опекуна"]}
            mapper={mapper}
            data={custodyData}
        />
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user
}))(Custody)
