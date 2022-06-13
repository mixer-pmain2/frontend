import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {formatDate, formatDateToInput} from "utility/string";
import useParams from "utility/app";
import Patient from "classes/Patient";
import {reason} from "consts/uchet";
import {Access} from "consts/user";

import Modal, {BTN_CANCEL, BTN_OK} from "components/Modal";
import {notifyError, notifySuccess, notifyWarning} from "components/Notify";
import Table from "components/Table";

import * as patientActions from "store/actions/patient";

import SelectSection from "./SelectSection";
import SelectCategory from "./SelectCategory";
import NewUchet from "./NewUchet";
import NewSindrom from "./NewSindrom";
import {PageTitle} from "components/Title";
import { dispanserSubModules, loadComponent } from 'consts/app'
import Icons from "components/Icons";
import InputDate from "components/Input/date";
import {accessRole} from "../../../../../configs/access";
import { useLoading } from 'components/Progress'
import { loadingAdd } from 'store/actions/application.ts'
import { loadingRemove } from 'store/actions/application'


const HistoryUchet = ({patient}) => {
    const mapper = (row) => {
        return <>
            <td>{row.section}</td>
            <td>{formatDate(row.date)}</td>
            <td>{row.categoryS}</td>
            <td>{row.reasonS}</td>
            <td>{row.diagnose}</td>
            <td>{row.diagnoseS}</td>
            <td>{row.dockName}</td>
        </>
    }

    const diagItems = (index, title, value) =>
        <div key={index} style={{display: "flex", flexDirection: "row"}}>
            <div style={{width: 100}}>{title}</div>
            <div>{value}</div>
        </div>

    return <div>
        <Table
            columns={["Участок", "Дата", "Категори", "Причина", "Учет", "Расшифровка диагноза", "Врач"]}
            data={patient?.uchet || []}
            mapper={mapper}
            loading={useLoading(loadComponent.history_uchet)}
        />
        <div className="mb-4">
            <h6>Синдромы</h6>
            <div style={{marginLeft: 15}}>
                {patient.sindrom?.filter(v => (v.diagnose.indexOf('F') + 1)).map((v, i) => diagItems(i, v.diagnose, v.diagnoseT))}
            </div>
        </div>
        <div>
            <h6>Хронические соматические заболевания</h6>
            <div style={{marginLeft: 15}}>
                {patient.sindrom?.filter(v => !(v.diagnose.indexOf('F') + 1)).map((v, i) => diagItems(i, v.diagnose, v.diagnoseT))}
            </div>
        </div>
    </div>
}


const T_UCHET = 0
const T_NEW = 1
const T_SIN_SOM = 2

const initForm = {
    section: false,
    category: false
}

const CATEGORY_NON_PRINUD = [1, 2, 3, 4, 5, 6]
const CATEGORY_PRINUD = [7, 8]

const Uchet = ({dispatch, patient, application, user}) => {
    const params = useParams(application.params)
    const [state, setState] = useState({
        tab: T_UCHET,
        isDoctor: user.access[user.unit] | accessRole.dispanser.administrator | accessRole.dispanser.doct,
        enableTransfer: false,
        patientLastState: "",
        isOpenSectionModal: false,
        isOpenCategoryModal: false,
        isSubmit: false,
        isHis: false,
        isUchet: false,
    })

    const [form, setForm] = useState({
        ...initForm,
        date: formatDateToInput(new Date()),
        patientId: patient.id,
        dockId: user.id
    })

    const [dateRange, setDateRange] = useState({
        min: "",
        max: ""
    })

    const handleNew = () => {
        const pat = new Patient(patient)
        const patLastReason = pat.getLastUchet().reason
        if (patLastReason === reason.DEAD) {
            notifyWarning("Для умершего не доступно")
            return
        }
        setState({...state, tab: T_NEW})
    }
    const handleSomSin = () => setState({...state, tab: T_SIN_SOM})
    const closeTab = () => setState({...state, tab: T_UCHET})

    const onChangeForm = (e) => {
        const name = e.target.name
        let value = e.target.value
        setForm({
            ...form,
            [name]: value
        })
    }

    const setDate = (date) => {
        setForm({
            ...form,
            date: date
        })
    }

    const isEnableTransfer = () => {
        const p = new Patient(patient)
        let isEnable = !!p.getLastUchet()?.category

        isEnable = isEnable && user.section[user.unit]?.filter(v => v > 17).length
        isEnable = isEnable && (user.access[user.unit] & Access.dispanser["Работа регистратора"]) === 0
        isEnable = isEnable && (user.access[user.unit] & Access.dispanser["Только просмотр (справочная система)"]) === 0
        isEnable = isEnable && !p.getLastUchet().reason.startsWith('S')
        isEnable = isEnable || user.section[user.unit]?.filter(v => v === 10).length
        isEnable = isEnable || (user.access[user.unit] & Access.dispanser["Прямой доступ к данным"]) > 0

        return isEnable
    }

    const isHis = () => {
        const p = new Patient(patient)
        return (Boolean(user.section[user.unit]?.indexOf(p.getLastUchet().section) + 1) && p.isUchet()) ||
            Boolean(user.section[user.unit]?.indexOf(10) + 1)
    }

    const onSelectSection = () => {
        setState({
            ...state,
            isOpenSectionModal: false,
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
            isSubmit: false
        })
    }

    const onSelectCategory = () => {
        setState({
            ...state,
            isOpenCategoryModal: false,
            isSubmit: true,
        })
        setForm({
            ...form,
            category: state.category
        })
    }

    const onCloseCategory = () => {
        setState({
            ...state,
            isOpenCategoryModal: false,
            isSubmit: false
        })
    }

    const handleNewTransfer = () => {
        setState({
            ...state,
            isOpenSectionModal: true,
            isSubmit: true
        })
    }

    useEffect(() => {
        if (state.isSubmit) {
            if (form.date == '') {
                setForm({
                    ...form,
                    date: formatDateToInput(new Date())
                })
            }
            if (!form.section) {
                setState({
                    ...state,
                    isOpenSectionModal: true
                })
                return
            }
            if (!form.category) {
                setState({
                    ...state,
                    isOpenCategoryModal: true
                })
                return
            }

            dispatch(patientActions.newRegTransfer(form))
                .then(res => {
                    if (res.success) {
                        notifySuccess("Учетные данные изменены")
                    } else {
                        notifyError(res?.message)
                    }
                })
                .finally(_ => {
                    setState({
                        ...state,
                        isSubmit: false
                    })
                    setForm({...form, ...initForm})
                })
        }

    }, [state.isSubmit, form])

    useEffect(() => {
        const p = new Patient(patient)
        dispatch(patientActions.getUchet({id: patient.id}))
        dispatch(patientActions.getHistorySindrom({id: patient.id}))
        const lastState = p.getLastUchet()?.reason?.startsWith('S')
            ? `Снят с учета ${formatDate(p.getLastUchet().date)}г. Причина: ${p.getLastUchet()?.reasonS?.toLowerCase()}`
            : ""
        setState({
            ...state,
            enableTransfer: isEnableTransfer(),
            patientLastState: lastState,
            section: user.section?.[user?.unit]?.filter(v => v > 17)?.[0],
            category: p?.category || 0,
            isHis: isHis(),
            isUchet: p.isUchet(),
            isAnonim: p.isAnonim()
        })
    }, [])

    useEffect(() => {
        setDateRange({
            min: params.registrat.minDate,
            max: params.registrat.maxDate
        })
    }, [])

    return <div>
        <PageTitle title={dispanserSubModules.uchet.title}/>
        <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row align-items-center">
                {
                    state.isDoctor && (state.isHis || !state.isUchet) && !state.isAnonim &&
                    <button className="btn btn-outline-primary" style={{marginRight: 5}}
                            onClick={handleNew}>{Icons.event.add}</button>}
                {
                    state.enableTransfer && !state.isHis && state.isDoctor && !state.isAnonim &&
                    <button className="btn btn-outline-primary" style={{marginRight: 15}} onClick={handleNewTransfer}>
                        Прием с других участков
                    </button>
                }
                <div className="d-flex flex-row align-items-center">
                    {/*<label style={{marginRight: 5}} htmlFor="date">Дата изменения</label>*/}
                    <InputDate className="form-control" style={{width: 150, marginRight: 15}}
                               name="date"
                               value={form.date || formatDateToInput(new Date())} onChange={setDate}
                               min={dateRange.min} max={dateRange.max}/>
                </div>
                <span>{state.patientLastState}</span>
            </div>
            {state.isDoctor && <button className="btn btn-outline-primary" onClick={handleSomSin}>
                Синдром и хронические заболевания
            </button>}
        </div>
        <hr/>
        {state.tab === T_UCHET && <HistoryUchet patient={patient}/>}
        {state.tab === T_NEW && <NewUchet onClose={closeTab} date={form.date}/>}
        {state.tab === T_SIN_SOM && <NewSindrom onClose={closeTab}/>}
        <Modal
            title={"№ участка"}
            body={<SelectSection
                sections={user.section?.[user?.unit]?.filter(v => v > 17) || []}
                section={state.section}
                onChange={v => {
                    setState({...state, section: Number(v)})
                }}
            />}
            isOpen={state.isOpenSectionModal}
            btnNum={BTN_OK + BTN_CANCEL}
            onOk={onSelectSection}
            onCancel={onCancelSection}
        />
        <Modal
            title={"Смена группы"}
            body={<SelectCategory
                categories={([18, 19].indexOf(form.section) + 1) ? CATEGORY_PRINUD : CATEGORY_NON_PRINUD}
                onChange={v => setState({...state, category: Number(v)})}
            />}
            isOpen={state.isOpenCategoryModal}
            btnNum={BTN_OK}
            onOk={onSelectCategory}
            onClose={onCloseCategory}
        />
    </div>
}

export default connect(state => ({
    patient: state.patient,
    application: state.application,
    user: state.user
}))(Uchet)
