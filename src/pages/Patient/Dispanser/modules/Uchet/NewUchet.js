import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import * as patientActions from "store/actions/patient"
import {loadingAdd, loadingRemove} from "store/actions/application";

import {formatDateToInput} from "utility/string";
import useParams from "utility/app";
import {category, categoryAmbulance, categoryConsultant, reason} from "consts/uchet";
import Patient from "classes/Patient";

import Notify, {notifyType} from "components/Notify";
import SelectSection from "./SelectSection";
import Modal, {BTN_NO, BTN_OK, BTN_YES} from "components/Modal";
import DiagnoseTree from "components/DiagnoseTree";


const NewUchet = ({dispatch, application, patient, user, onClose, date}) => {
    const pat = new Patient(patient)
    const [form, setForm] = useState({
        patientId: patient.id,
        date: date,
        // diagnose: pat.getLastUchet()?.diagnose,
        // category: pat.getLastUchet()?.category,
        // section: pat.getLastUchet()?.section,
        dockId: user.id
    })
    const [state, setState] = useState({
        isOpenDiagModal: false,
        isShowCategory: true,
        isShowExitReason: false,
        isOpenSectionModal: false,
        isSelectedSection: false,
        isSubmit: false,
        section: user.section[user.unit]?.[0] || 0,
        diagType: 5,
        //Контроль обязательного изменения
        isOpenQuestionChangeDiag: false, //показать окно с вопросом
        changeDiagRequire: false, //проверка на изменение если тру
        isChangedDiagRequire: false //уже изменен
    })

    const notifySuccess = message => Notify(notifyType.SUCCESS, message)()
    const notifyError = message => Notify(notifyType.ERROR, message)()

    const onChangeForm = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === 'category') value = Number(value)
        setForm({
            ...form,
            [name]: value
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
        if (form?.reason === reason.TRANSFER_TO_CONSULTATION) return categoryConsultant.indexOf(Number(c)) + 1
        if (form?.reason === reason.TRANSFER_TO_AMBULANCE) return categoryAmbulance.indexOf(Number(c)) + 1
        if (form?.reason === reason.TRANSFER_CATEGORY) return categoryAmbulance.indexOf(Number(c)) + 1
        if (form?.reason === reason.NEW) return true

        return false
    }

    const onSelectDiag = (diagnose) => {
        setState({
            ...state,
            isOpenDiagModal: false,
            isSubmit: true,
            isChangedDiagRequire: true
        })
        setForm({
            ...form,
            diagnose: diagnose,
        })
    }

    const onCancelDiag = () => {
        setState({
            ...state,
            isOpenDiagModal: false,
            isSubmit: false
        })
    }

    const onSelectSection = () => {
        setState({
            ...state,
            isOpenSectionModal: false,
            isSelectedSection: true,
            isSubmit: true
        })
        setForm({
            ...form,
            section: state.section
        })
    }

    const onCancelSection = () => {
        setState({
            ...state,
            isOpenSectionModal: false,
            isSubmit: false,
        })
    }

    const onChangeToRequired = () => {
        setState({
            ...state,
            isOpenQuestionChangeDiag: false,
            isChangedDiagRequire: false,
            changeDiagRequire: true,
            isOpenDiagModal: true,
            diagType: 5
        })
    }
    const onChangeToNotRequired = () => {
        setState({
            ...state,
            isOpenQuestionChangeDiag: false,
            changeDiagRequire: false,
            isChangedDiagRequire: true,
            isSubmit: true,
        })
    }

    const submitForm = () => {
        if (form.reason === reason.NEW && !state.isSelectedSection) {
            setState({
                ...state,
                isOpenSectionModal: true
            })
            return
        }

        if (state.changeDiagRequire && !state.isChangedDiagRequire) {
            setState({
                ...state,
                isOpenQuestionChangeDiag: true,
            })
            return
        }

        if ((state.changeDiagRequire && !state.isChangedDiagRequire) || (!form?.diagnose && [reason.CHANGE_DIAG, reason.NEW].indexOf(form.reason) + 1)) {
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
        dispatch(patientActions.newReg(form))
            .then(res => {
                if (res?.success) {
                    notifySuccess("Учетные данные изменены")
                    onClose()
                } else {
                    notifyError(res?.message)
                }
            })
            .finally(() => dispatch(loadingRemove(loaderName)))
    }

    useEffect(() => {
        let diagType = 5
        if (form.reason === reason.CHANGE_DIAG) {
            if (!pat.getLastUchet()) {
                if (form.section > 16) diagType = 4
                else diagType = 0
            }
        }
        setState({
            ...state,
            diagType: diagType
        })

    }, [form.section, form.reason])

    useEffect(() => {
        if (state?.isSubmit) {
            submitForm()
        }

    }, [state.isSubmit, state.isSelectedSection, form.section, form.diagnose])

    useEffect(() => {
        setState({
            ...state,
            isShowCategory: !(form.reason === reason.CHANGE_DIAG || form.reason === reason.UNREGISTER),
            isShowExitReason: form.reason === reason.UNREGISTER,
            changeDiagRequire: [reason.TRANSFER_TO_AMBULANCE, reason.TRANSFER_TO_CONSULTATION, reason.TRANSFER_CATEGORY].indexOf(form.reason) + 1
        })

        const _category = form.reason === reason.TRANSFER_TO_CONSULTATION ? 10 : pat.getLastUchet()?.category
        setForm({
            ...form,
            category: Number(_category)
        })
    }, [form?.reason])

    return <div>
        <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex justify-content-start flex-wrap">
                <div style={{marginRight: 15, minWidth: 300}}>
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
                {state.isShowCategory &&
                <div className="border border-1" style={{padding: 10, marginRight: 15, minWidth: 150}}>
                    {Object.keys(category).map((v, i) =>
                        <div className="form-check" key={i}>
                            <input
                                type="radio"
                                className="form-check-input"
                                value={v} name={"category"}
                                id={`category_${v}`}
                                onChange={onChangeForm}
                                checked={form.category == v}
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
            body={<DiagnoseTree type={state.diagType} onSelect={onSelectDiag}/>}
            isOpen={state.isOpenDiagModal}
            onClose={onCancelDiag}
        />
        <Modal
            title={"№ участка"}
            body={<SelectSection sections={user.section?.[user?.unit] || []} section={state.section}
                                 onChange={v => setState({...state, section: Number(v)})}/>}
            isOpen={state.isOpenSectionModal}
            btnNum={user.section?.[user?.unit] ? BTN_OK : 0}
            onOk={onSelectSection}
            onClose={onCancelSection}
        />
        <Modal
            body={<div>Изменить диагноз?</div>}
            btnNum={BTN_YES + BTN_NO}
            isOpen={state.isOpenQuestionChangeDiag}
            onYes={onChangeToRequired}
            onNo={onChangeToNotRequired}
        />
    </div>
}

export default connect(state => ({
    application: state.application,
    patient: state.patient,
    user: state.user
}))(NewUchet)
