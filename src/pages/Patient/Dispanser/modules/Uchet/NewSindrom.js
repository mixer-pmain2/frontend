import React, {useState} from "react";
import {connect} from "react-redux";

import Table from "components/Table";
import {formatDate} from "utility/string";

import {ButtonRemove} from "components/Button";
import Modal, {BTN_CANCEL, BTN_OK} from "components/Modal";

import {addSindrom, deleteSindrom} from "store/actions/patient";
import {notifyError, notifySuccess} from "components/Notify";
import DiagnoseTree from "components/DiagnoseTree";


const NewSindrom = ({dispatch, patient, user, onClose}) => {
    const [state, setState] = useState({
        row: null,
        isOpenModal: false,
        isOpenDiagModal: false,
        isOpenDialogDiag: false,
        diagnose: null,
        diagType: 0
    })
    const [form, setForm] = useState({
        patientId: patient.id,
        doctId: user.id,
        diagnose: ""
    })

    const showDialog = (row) => {
        setState({
            ...state,
            row,
            isOpenModal: true
        })
    }

    const handleDelete = () => {
        dispatch(deleteSindrom({patientId: patient.id, id: state.row?.id}))
            .then(res => {
                if (res.success) {
                    notifySuccess("Запись удалена")
                } else {
                    notifyError(res.message)
                }
            })

        setState({
            ...state,
            isOpenModal: false
        })
    }

    const handleCloseDialog = () => {
        setState({
            ...state,
            isOpenModal: false,
            row: null
        })
    }

    const onSelectDiag = (diagnose) => {
        setState({
            ...state,
            isOpenDiagModal: false,
            isOpenDialogDiag: true
        })
        setForm({
            ...form,
            diagnose
        })
    }

    const onCancelDiag = () => {
        setState({
            ...state,
            isOpenDiagModal: false
        })
    }

    const handleAddSindrom = () => {
        setState({
            ...state,
            diagType: 4,
            isOpenDiagModal: true
        })
    }

    const addDiagnose = () => {
        setState({
            ...state,
            isOpenDialogDiag: false,
        })
        console.log(form)
        dispatch(addSindrom({...form, cache: false}))
            .then(res => {
                if (res.success) {
                    notifySuccess("Диагноз добавлен")
                } else {
                    notifyError(res.message)
                }
            })
    }

    const handleAddSomat = () => {
        setState({
            ...state,
            diagType: 3,
            isOpenDiagModal: true
        })
    }

    const handleCloseAddDialog = () => {
        setState({
            ...state,
            isOpenDialogDiag: false,
        })
        setForm({
            ...form,
            diagnose: ""
        })
    }

    const countSindrom = () => {
        return patient.sindrom?.filter(v => v.diagnose.indexOf('F') + 1).length
    }

    const countSomat = () => {
        return patient.sindrom?.filter(v => v.diagnose.indexOf('F')).length
    }

    const mapper = (v) => <>
        <td>{v.diagnose}</td>
        <td>{v.diagnoseT}</td>
        <td>{formatDate(v.date)}</td>
        <td>{v.doctName}</td>
        <td>
            <ButtonRemove className="btn" onClick={_ => showDialog(v)}/>
        </td>
    </>

    return <div>
        <Table
            columns={["Диагноз", "Расшифровка", "Дата", "Врач", ""]}
            mapper={mapper}
            data={patient?.sindrom || []}
        />
        <div className="d-flex flex-row justify-content-between">
            <div>
                Максимальное количество синдромов и хронических заболеваний по 4.
            </div>
            <div>
                {countSindrom() < 4 && <button className="btn btn-outline-primary" onClick={handleAddSindrom}
                                               style={{marginRight: 5}}>
                    Добавить синдром
                </button>}
                {countSomat() < 4 &&
                <button className="btn btn-outline-primary" onClick={handleAddSomat} style={{marginRight: 5}}>
                    Добавить хронич.
                </button>}
                <button className="btn btn-outline-danger" onClick={onClose}>Закрыть</button>
            </div>
        </div>
        <Modal
            title={"Удалить диагноз?"}
            isOpen={state.isOpenModal}
            onClose={handleCloseDialog}
            body={<div>
                {state.row?.diagnose}
            </div>}
            btnNum={BTN_OK + BTN_CANCEL}
            onCancel={handleCloseDialog}
            onOk={handleDelete}
        />
        <Modal
            style={{maxWidth: 750}}
            body={<DiagnoseTree type={state.diagType} onSelect={onSelectDiag}/>}
            isOpen={state.isOpenDiagModal}
            onClose={onCancelDiag}
        />
        <Modal
            body={<div>
                Добавить диагноз {form.diagnose} ?
            </div>}
            isOpen={state.isOpenDialogDiag}
            btnNum={BTN_OK + BTN_CANCEL}
            onOk={addDiagnose}
            onClose={handleCloseAddDialog}
            onCancel={handleCloseAddDialog}
        />
    </div>
}

export default connect(state => ({
    patient: state.patient,
    user: state.user,
}))(NewSindrom)
