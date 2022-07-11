import * as React from "react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {connect} from "react-redux"

import * as patientActions from "store/actions/patient"
import * as appActions from "store/actions/application"

import Layout from "../Layout";

import {linkDict} from "../../routes";

import {formatDate} from "utility/string";
import Dispanser from "./Dispanser";
import Patient from "classes/Patient";

type PatientDetailProps = {
    onReset: () => any
    patient: PatientStore
}


const PatientDetail = ({onReset, patient}: PatientDetailProps) => {
    const p = new Patient(patient)
    const state = {
        lastUchet: p.getLastUchet(),
        isUchet: p.isUchet()
    }

    const patItem = (text) =>
        <span className="input-group-text bg-light mb-3" id="basic-addon3" style={{marginRight: 10}}>
            {text}
        </span>

    const patLabel = (title, text) => <div className="d-flex flex-row mb-3" style={{marginRight: 10}}>
        <span className="input-group-text">{title}</span>
        <span className="input-group-text bg-light" id="basic-addon3">
            {text}
        </span>
    </div>

    return <div>
        <div className="d-flex flex-row justify-content-between">
            <a href="#" className="btn btn-outline-secondary mb-3" style={{marginRight: 10}}
               onClick={onReset}>Сброс</a>
            <div className="d-flex flex-row mb-3" style={{marginRight: 10, minWidth: 150, maxWidth: 200}}>
                <span className="input-group-text">Шифр</span>
                <input
                    type="text"
                    className="form-control bg-light"
                    autoFocus={true}
                    id="patientId"
                    name="patientId"
                    maxLength={10}
                    value={patient.id ? Number(patient?.id) : ""}
                    readOnly={true}
                />
            </div>
            <div className="d-flex flex-row w-100 mb-3" style={{marginRight: 10, minWidth: 400}}>
                <span className="input-group-text" id="basic-addon3">Ф.И.О.</span>
                <input
                    type="text"
                    className="form-control bg-light"
                    autoFocus={true}
                    value={(patient?.lname || "") + " " + (patient?.fname || "") + " " + (patient?.sname || "")}
                    readOnly={true}
                />
            </div>

            {patItem(patient?.sex)}
            {patItem(formatDate(patient?.bday))}
            {patItem(patient?.snils)}
            <button className="input-group-text btn btn-outline-primary mb-3">Найти</button>
        </div>
        <div className="mb-3 d-flex flex-row flex-wrap">
            {!state.isUchet && state.lastUchet?.reason && patLabel("Снят с учета", `${formatDate(p.getLastUchet().date)}г.`)}
            {!state.isUchet && state.lastUchet?.reason && patLabel("Причина", `${p.getLastUchet()?.reasonS?.toLowerCase()}`)}
            {state.isUchet && patLabel("Участок", state.lastUchet?.section)}
            {state.isUchet && patLabel("Учет", state.lastUchet?.categoryS)}
            {state.isUchet && patLabel("Диагноз учета", state.lastUchet?.diagnose)}
            {patLabel("Адрес", patient.address)}
        </div>
    </div>
}

type GetPatientProps = {
    dispatch: (p: any) => any
    patient: PatientStore
    application: ApplicationStore
}

const GetPatient = (props: GetPatientProps) => {
    const {dispatch, patient, application} = props

    const navigation = useNavigate()
    const {id} = useParams()

    const foundById = (id) => {
        return dispatch(patientActions.findById({id}))
            .then(res => {
                dispatch(patientActions.select(res))
                dispatch(patientActions.getUchet({id: patient.id}))
                return res
            })
    }

    const onReset = () => {
        dispatch(patientActions.reset())
        navigation(linkDict.findPatient)
    }

    const onEscDown = (e) => {
        if (e.code === 'Escape') onReset()
    }

    useEffect(() => {
        let action = false

        if (!action) {
            if (patient?.id) {
                dispatch(appActions.enableLoading())
                foundById(id)
                dispatch(appActions.disableLoading())
            } else {
                navigation(linkDict.findPatient)
            }

            document.addEventListener("keydown", onEscDown, false);
        }

        return () => {
            action = true
            document.removeEventListener("keydown", onEscDown, false);
        }
    }, [])

    return <Layout>
        <PatientDetail
            patient={patient}
            onReset={onReset}
        />
        <hr style={{marginTop: 10, marginBottom: 25}}/>
        <Dispanser/>
    </Layout>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    application: state.application
}))(GetPatient)
