import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as patientAction from "store/actions/patient"

import {formatDateToInput} from "utility/string";
import useParams from "utility/app";
import Patient from "classes/Patient";
import {category, categoryAmbulance, categoryConsultant, reason} from "consts/uchet";
import Notify, {notifyType} from "components/Notify";
import {loadingAdd, loadingRemove} from "store/actions/application";
import Modal from "../../../../../components/Modal";
import DiagnoseTree, {getTypeDiagsModal} from "../../../components/DiagnoseTree";

const NewUchet = ({dispatch, application, patient, onClose}) => {
    const [state, setState] = useState({
        isOpenDiagModal: false,
        isShowCategory: true,
        isShowExitReason: false,
        isSubmit: false
    })
    const params = useParams(application.params)
    const pat = new Patient(patient)
    const [form, setForm] = useState({
        patientId: patient.id,
        date: formatDateToInput(new Date()),
        category: pat.getLastUchet()?.category?.toString()
    })
    const [dateRange, setDateRange] = useState({
        min: "",
        max: ""
    })

    const notifySuccess = message => Notify(notifyType.SUCCESS, message)()
    const notifyError = message => Notify(notifyType.ERROR, message)()

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const filterReason = (sprReason) => {
        const _reason = Object.keys(sprReason)
        const lastUchet = pat.getLastUchet()
        if (lastUchet?.reason?.startsWith('S') || !lastUchet) {
            return _reason.filter(v => v === reason.NEW)
        }
        if (lastUchet?.section > 0) {
            let _r = _reason.filter(v => !v.startsWith('S'))
                .filter(v => !([reason.NEW, reason.SECTION_TRANSFER].indexOf(v) + 1))
            if (lastUchet.category === 10) {
                _r = _r.filter(v => v !== reason.TRANSFER_CATEGORY)
            }
            return _r
        }
        return _reason
    }

    const isAvailableCategory = (c) => {
        if (form?.reason === reason.TRANSFER_TO_CONSULTATION) return categoryConsultant.indexOf(10) + 1
        if (form?.reason === reason.TRANSFER_TO_AMBULANCE) return categoryAmbulance.indexOf(Number(c)) + 1
        if (form?.reason === reason.TRANSFER_CATEGORY) return categoryAmbulance.indexOf(Number(c)) + 1

        return false
    }

    const onSelectDiag = (diagnose) => {
        setState({
            ...state,
            isOpenDiagModal: false,
            isSubmit: true
        })
        setForm({
            ...form,
            diagnose: diagnose,
        })

    }

    const submitForm = () => {
        if (!form?.diagnose && form.reason === reason.CHANGE_DIAG) {
            setState({
                ...state,
                isOpenDiagModal: true
            })
            return
        }
        newReg()
    }

    const newReg = () => {
        const loaderName = "newReg"
        dispatch(loadingAdd(loaderName))
        dispatch(patientAction.newReg(form))
            .then(res => {
                if (res?.success) {
                    notifySuccess("Учетные данные изменены")
                    // onClose()
                } else {
                    notifyError(res?.message)
                }
            })
            .finally(() => dispatch(loadingRemove(loaderName)))
    }

    useEffect(() => {
        if (state?.isSubmit) {
            newReg()
        }

    }, [state.isSubmit])

    useEffect(() => {
        setState({
            ...state,
            isShowCategory: !(form.reason === reason.CHANGE_DIAG || form.reason === reason.UNREGISTER),
            isShowExitReason: form.reason === reason.UNREGISTER
        })

        setForm({
            ...form,
            category: form.reason === reason.TRANSFER_TO_CONSULTATION ? '10' : pat.getLastUchet()?.category?.toString()
        })
    }, [form?.reason])

    useEffect(() => {
        setDateRange({
            min: params.visit.minDate,
            max: params.visit.maxDate
        })
    }, [])

    return <div>
        <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex justify-content-start flex-wrap">
                <div style={{marginRight: 15, minWidth: 300}}>
                    <div className="d-flex flex-row align-items-center">
                        <label style={{marginRight: 5}} htmlFor="date">Дата изменения</label>
                        <input className="form-control" style={{width: 150, marginRight: 15}} type="date" id="date"
                               name="date"
                               value={form.date || formatDateToInput(new Date())} onChange={onChangeForm}
                               min={dateRange.min} max={dateRange.max}/>
                    </div>
                    <div>
                        <h6>Причины</h6>
                        {filterReason(application.spr.reason).map((v, i) =>
                            <div className="form-check" key={i}>
                                <input type="radio" className="form-check-input" value={v} name={"reason"}
                                       id={`reason_${v}`} onChange={onChangeForm}/>
                                <label className="form-check-label" htmlFor={`reason_${v}`}>
                                    {application.spr.reason[v]}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                {state.isShowCategory && <div className="border border-1" style={{padding: 10, marginRight: 15, minWidth: 150}}>
                    {Object.keys(category).map((v, i) =>
                        <div className="form-check" key={i}>
                            <input
                                type="radio"
                                className="form-check-input"
                                value={v} name={"category"}
                                id={`category_${v}`}
                                onChange={onChangeForm}
                                checked={form.category === v}
                                disabled={!isAvailableCategory(v)}
                            />
                            <label className="form-check-label" htmlFor={`category_${v}`}>
                                {category[v]}
                            </label>
                        </div>
                    )}
                </div>}
                {state.isShowExitReason && <div style={{marginRight: 15}}>
                    <h6>Причины снятия</h6>
                    {Object.keys(application.spr.reason).filter(v => v.startsWith('S')).map((v, i) =>
                        <div className="form-check" key={i}>
                            <input
                                type="radio"
                                className="form-check-input"
                                value={v} name={"exitReason"}
                                id={`exitReason_${v}`}
                                onChange={onChangeForm}
                            />
                            <label className="form-check-label" htmlFor={`exitReason_${v}`}>
                                {application.spr.reason[v]}
                            </label>
                        </div>
                    )}

                </div>}
            </div>
            <div className="d-flex flex-column justify-content-start" style={{minWidth: 120}}>
                <button className="btn btn-outline-danger" style={{marginBottom: 5}} onClick={onClose}>
                    Отмена
                </button>
                <button className="btn btn-primary" onClick={submitForm} disabled={!form?.reason}>Записать</button>
            </div>
        </div>
        <hr/>
        <Modal
            style={{maxWidth: 750}}
            body={<DiagnoseTree type={getTypeDiagsModal(form.uch)} onSelect={onSelectDiag}/>}
            isOpen={state.isOpenDiagModal}
            onClose={() => setState({...state, isOpenDiagModal: false})}
        />
    </div>
}

export default connect(state => ({
    application: state.application,
    patient: state.patient
}))(NewUchet)
