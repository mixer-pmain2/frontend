import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Table from "components/Table";
import * as patientActions from "store/actions/patient";
import {formatDate, formatDateToInput} from "utility/string";
import useParams from "utility/app";
import Patient from "classes/Patient";
import NewUchet from "./NewUchet";
import {reason} from "consts/uchet";
import Notify, {notifyType, notifyWarning} from "../../../../../components/Notify";
import {Access} from "consts/user";
import Modal, {BTN_CANCEL, BTN_OK} from "components/Modal";

import SelectSection from "./SelectSection";
import SelectCategory from "./SelectCategory";
import {AccessRoleAdminDispanser} from "configs/access";


const HistoryUchet = ({patient}) => {
    const sindrom = [
        {title: "Sim1", value: "Sim1T"},
        {title: "Sim2", value: "Sim2T"},
        {title: "Sim3", value: "Sim3T"},
        {title: "Sim4", value: "Sim4T"},
    ]
    const somat = [
        {title: "Som1", value: "Som1T"},
        {title: "Som2", value: "Som2T"},
        {title: "Som3", value: "Som3T"},
        {title: "Som4", value: "Som4T"},
    ]


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

    const diagItems = (title, value) =>
        <div key={title}>
            <span>{title}</span> <span>{value}</span>
        </div>

    return <div>
        <Table
            columns={["Участок", "Дата", "Категори", "Причина", "Учет", "Расшифровка диагноза", "Врач"]}
            data={patient?.uchet || []}
            mapper={mapper}
        />
        <div className="mb-4">
            <h6>Синдромы</h6>
            <div style={{marginLeft: 15}}>
                {sindrom.map((v, i) => diagItems(v.title, v.value))}

            </div>
        </div>
        <div>
            <h6>Хронические соматические заболевания</h6>
            <div style={{marginLeft: 15}}>
                {somat.map((v, i) => diagItems(v.title, v.value))}
            </div>
        </div>
    </div>
}


const NewSomSin = ({onClose}) => {
    return <div>
        newsomsin
        <button className="btn btn-outline-danger" onClick={onClose}>Закрыть</button>
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
    const [state, setState] = useState({
        tab: T_UCHET,
        isDoctor: user.access[user.unit] | AccessRoleAdminDispanser,
        enableTransfer: false,
        patientLastState: "",
        isOpenSectionModal: false,
        isOpenCategoryModal: false,
        isSubmit: false
    })
    const [form, setForm] = useState(initForm)
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


    const isEnableTransfer = () => {
        const p = new Patient(patient)
        let isEnable = !!p.getLastUchet().category

        isEnable = isEnable && user.section[user.unit]?.filter(v => v > 17).length
        isEnable = isEnable && (user.access[user.unit] & Access.dispanser["Работа регистратора"]) === 0
        isEnable = isEnable && (user.access[user.unit] & Access.dispanser["Только просмотр (справочная система)"]) === 0
        isEnable = isEnable && !p.getLastUchet().reason.startsWith('S')
        isEnable = isEnable || user.section[user.unit]?.filter(v => v === 10).length
        isEnable = isEnable || (user.access[user.unit] & Access.dispanser["Прямой доступ к данным"]) > 0

        return isEnable
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
            console.log(form)
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

            //todo create new transfer
            setForm(initForm)
            setState({
                ...state,
                isSubmit: false
            })
        }

    }, [state.isSubmit, form])

    useEffect(() => {
        const p = new Patient(patient)
        dispatch(patientActions.getUchet({id: patient.id}))
        const lastState = p.getLastUchet().reason.startsWith('S')
            ? `Снят с учета ${formatDate(p.getLastUchet().date)}г. Причина: ${p.getLastUchet()?.reasonS?.toLowerCase()}`
            : ""
        setState({
            ...state,
            enableTransfer: isEnableTransfer(),
            patientLastState: lastState,
            section: user.section?.[user?.unit]?.filter(v => v > 17)?.[0],
            category: p?.category || 0
        })
    }, [])

    return <div>
        <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row align-items-center">
                {state.isDoctor && <button className="btn btn-outline-primary" style={{marginRight: 5}} onClick={handleNew}>+</button>}
                {state.enableTransfer && state.isDoctor &&
                <button className="btn btn-outline-primary" style={{marginRight: 15}} onClick={handleNewTransfer}>
                    Прием с других участков
                </button>}
                <span>{state.patientLastState}</span>
            </div>
            <button className="btn btn-outline-primary" onClick={handleSomSin}>
                Синдром и хронические заболевания
            </button>
        </div>
        <hr/>
        {state.tab === T_UCHET && <HistoryUchet patient={patient}/>}
        {state.tab === T_NEW && <NewUchet onClose={closeTab}/>}
        {state.tab === T_SIN_SOM && <NewSomSin onClose={closeTab}/>}
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
