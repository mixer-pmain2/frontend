import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";

import {PageTitle} from "components/Title";
import Icons from "components/Icons";
import Panel from "components/Panel";
import Table from "components/Table";
import AddCustody from "./AddCustody";

import {dispanserSubModules} from "consts/app";
import {Access} from "consts/user";

import {getCustody} from "store/actions/patient";
import {formatDate} from "utility/string";
import {getSprCustodyWho} from "store/actions/application";
import CancelCustody from "./CancelCustody";


const mapper = (row: PatientCustodyStore) =>
    <>
        <td>{row.dateStart ? formatDate(row.dateStart) : ""}</td>
        <td>{row.dateEnd ? formatDate(row.dateEnd) : ""}</td>
        <td>{row.who}</td>
    </>


type CustodyProps = {
    dispatch: any
    user: UserStore,
    patient: PatientStore,
    application: ApplicationStore
}

const Custody = ({dispatch, user, patient, application}: CustodyProps) => {
    const [row, setRow] = useState<PatientCustodyStore>()
    const [state, setState] = useState({
        isAccessed: Boolean(user.access[user.unit] & Access.dispanser["Работа с инвалидностью"]),
        showPanelAdd: false,
        showPanelRemove: false,
    })

    const toggleVisiblePanelAdd = () => {
        setState({
            ...state,
            showPanelAdd: !state.showPanelAdd,
            showPanelRemove: false
        })
    }

    const toggleVisiblePanelRemove = () => {
        setState({
            ...state,
            showPanelAdd: false,
            showPanelRemove: !state.showPanelRemove
        })
    }


    useEffect(() => {
        if (!application.spr.custody?.who) {
            dispatch(getSprCustodyWho())
        }
        dispatch(getCustody({patientId: patient.id}))

    }, [])

    return <div>
        <PageTitle title={dispanserSubModules.custody.title}/>
        {state.isAccessed && <div className="d-flex flex-row" style={{marginBottom: 15}}>
            <button className="btn btn-outline-primary" style={{marginRight: 5}} onClick={toggleVisiblePanelAdd}>
                {Icons.event.add}
            </button>
            {patient.custody?.length > 0 &&
            <button className="btn btn-outline-primary" onClick={toggleVisiblePanelRemove}>
                {Icons.event.delete}

            </button>}
        </div>}
        <hr/>
        <Table
            columns={["Дата лишения", "Дата отмены", "Наличие опекуна"]}
            mapper={mapper}
            data={patient.custody || []}
            selecting={state.showPanelRemove || state.showPanelAdd}
            onClick={setRow}
        />
        {state.showPanelAdd && <Panel>
            <AddCustody onClose={toggleVisiblePanelAdd}/>
        </Panel>}
        {state.showPanelRemove && <Panel>
            <CancelCustody onClose={toggleVisiblePanelRemove} data={row}/>
        </Panel>}
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user,
    application: state.application
}))(Custody)
