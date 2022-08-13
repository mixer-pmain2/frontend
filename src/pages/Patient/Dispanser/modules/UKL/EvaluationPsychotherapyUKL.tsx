import React, {useEffect, useState} from "react";
import LevelItem from "./components/LevelItem";
import Select from "components/Input/select";
import {PsychotherapyUKL} from "configs/ukl";
import UKLItem from "./components/UKLItem";
import UKLGroupItems from "./components/UKLGroupItems";
import {formatDateToInput} from "utility/string";
import {getDoctorVisitByPatient} from "store/actions/patient";
import Button from "components/Button";
import Modal, {BTN_CLOSE} from "components/Modal";
import {
    getUKLPsychotherapy,
    saveUKLPsychotherapy,
} from "api/patient";
import User from "classes/User";
import Application from "classes/Application";
import {notifyError, notifySuccess} from "components/Notify";
import ModalHistory from "./components/ModalHistory";
import {UKL_TYPE_VISIT} from "../../../../../consts/ukl";


type EvaluationPsihoUKLProps = {
    dispatch?
    user: UserStore
    patient: PatientStore
    application: ApplicationStore
    onClose?
}

const EvaluationPsychotherapyUKL = (p: EvaluationPsihoUKLProps) => {
    const u = new User(p.user)
    const app = new Application(p.application)
    const [state, setState] = useState<{
        sum: number
        doctorList: Doctor[]
        enabled: boolean
        error: string
        allowedEditDate: boolean
        ukl?: UKLData
        showHistory: boolean
    }>({
        sum: 100,
        doctorList: [],
        enabled: true,
        error: "",
        allowedEditDate: false,
        showHistory: false
    })
    const [form, setForm] = useState({
        evaluations: PsychotherapyUKL.map((v, i) => v.evaluations[0]),
        level: 1,
        date: formatDateToInput(new Date()),
        doctorId: 0,
        id: 0,
        patientId: p.patient.id,
        unit: u.unit,
        userId: p.user.id
    })

    const handleChangeEvaluation = (i) => (_, value) => {
        setForm(f => {
            let e = f.evaluations
            e[i] = Number(value)
            return {
                ...f,
                evaluations: e
            }
        })
    }

    const handleReset = () => {
        setForm(f => ({
            ...f,
            evaluations: PsychotherapyUKL.map(v => v.evaluations[0]),
            doctorId: 0
        }))
    }

    const loadUKL = async () => {
        await getUKLPsychotherapy({patientId: p.patient.id, cache: false})
            .then(res => {
                setState(s => ({
                    ...s,
                    ukl: res
                }))

                if (state.doctorList.filter(v => v.id == res.doctor).length > 0)
                    setForm(f => ({
                        ...f,
                        doctorId: res.doctor
                    }))
            })
    }

    const getDoctors = async () => {
        await p.dispatch(getDoctorVisitByPatient({patientId: p.patient.id, date: form.date}))
            .then(res => {
                setState(s => ({
                    ...s,
                    doctorList: res,
                    enabled: Boolean(res.length),
                    error: !Boolean(res.length) ? "За последний год пациента не видел ни один врач." : ""
                }))
                setForm(f => ({...f, doctorId: 0}))
            })
    }

    const handleChangeLevel = (v) => {
        setForm(f => ({
            ...f,
            level: v,
            evaluations: PsychotherapyUKL.map(v => v.evaluations[0])
        }))
    }

    const handleSubmit = () => {
        saveUKLPsychotherapy(form)
            .then(res => {
                if (res.success) {
                    notifySuccess("Оценка сохранена")
                } else {
                    notifyError(res.message)
                }
            })
    }

    useEffect(() => {
        let action = false
        if (!action) {
            if ((state.doctorList.map(v => v.id).indexOf(state.ukl?.doctor) + 1)) {
                setForm(f => ({
                    ...f,
                    doctorId: state.ukl.doctor
                }))
            }
        }
        return () => {
            action = true
        }
    }, [state.ukl])

    useEffect(() => {
        setState(s => ({
            ...s,
            sum: form.evaluations.reduce((sum, a) => sum + a, 0)
        }))

    }, [form])

    useEffect(() => {
        let action = false
        if (!action)
            getDoctors()
        return () => {
            action = true
        }
    }, [form.date])

    useEffect(() => {
        let action = false
        if (!action) {
            (async () => {
                await getDoctors()
                await loadUKL()
            })()
            // setState(s => ({
            //     ...s,
            //     allowedEditDate: app.getParams("UKL_EDIT_DATE").filter(v => v.paramI == p.user.id).length > 0
            // }))
        }
        return () => {
            action = true
        }
    }, [])

    return <div>
        <div className="d-flex flex-row align-items-end">
            <LevelItem access={u.access} defaultValue={form.level} onChange={handleChangeLevel}/>
            <Button className="btn-outline-primary"
                    onClick={_ => setState(s => ({...s, showHistory: true}))}>История</Button>
            {/*{state.allowedEditDate && <InputDate*/}
            {/*    value={form.date} onChange={v => setForm(f => ({...f, date: v}))}*/}
            {/*    style={{marginRight: 15}}*/}
            {/*/>}*/}
        </div>
        <hr/>
        <div className="d-flex flex-row flex-wrap justify-content-around" style={{minWidth: 400}}>
            <div style={{width: 500, paddingRight: 25}}>
                <UKLGroupItems title={"Ведение мед. документации"}>
                    <UKLItem value={form.evaluations?.[0]} item={PsychotherapyUKL[0]} onChange={handleChangeEvaluation(0)}/>
                    <UKLItem value={form.evaluations?.[1]} item={PsychotherapyUKL[1]} onChange={handleChangeEvaluation(1)}/>
                </UKLGroupItems>
                <UKLGroupItems title={"Первичный осмотр и сроки оказания помощи:"}>
                    <UKLItem value={form.evaluations?.[2]} item={PsychotherapyUKL[2]} onChange={handleChangeEvaluation(2)}/>
                    <UKLItem value={form.evaluations?.[3]} item={PsychotherapyUKL[3]} onChange={handleChangeEvaluation(3)}/>
                    <UKLItem value={form.evaluations?.[4]} item={PsychotherapyUKL[4]} onChange={handleChangeEvaluation(4)}/>
                    <UKLItem value={form.evaluations?.[5]} item={PsychotherapyUKL[5]} onChange={handleChangeEvaluation(5)}/>
                    <UKLItem value={form.evaluations?.[6]} item={PsychotherapyUKL[6]} onChange={handleChangeEvaluation(6)}/>
                </UKLGroupItems>
            </div>
            <div style={{width: 500}}>
                <UKLGroupItems title={"Установление клинического диагноза "}>
                    <UKLItem value={form.evaluations?.[7]} item={PsychotherapyUKL[7]} onChange={handleChangeEvaluation(7)}/>
                    <UKLItem value={form.evaluations?.[8]} item={PsychotherapyUKL[8]} onChange={handleChangeEvaluation(8)}/>
                    <UKLItem value={form.evaluations?.[9]} item={PsychotherapyUKL[9]} onChange={handleChangeEvaluation(9)}/>
                    <UKLItem value={form.evaluations?.[10]} item={PsychotherapyUKL[10]}
                             onChange={handleChangeEvaluation(10)}/>
                    <UKLItem value={form.evaluations?.[11]} item={PsychotherapyUKL[11]}
                             onChange={handleChangeEvaluation(11)}/>
                </UKLGroupItems>
                <UKLGroupItems title={"Назначение лекарственных препаратов"}>
                    <UKLItem value={form.evaluations?.[12]} item={PsychotherapyUKL[12]} onChange={handleChangeEvaluation(12)}/>
                    <UKLItem value={form.evaluations?.[13]} item={PsychotherapyUKL[13]} onChange={handleChangeEvaluation(13)}/>
                </UKLGroupItems>
                <UKLGroupItems>
                    <UKLItem value={form.evaluations?.[14]} item={PsychotherapyUKL[14]} onChange={handleChangeEvaluation(14)}/>
                    <UKLItem value={form.evaluations?.[15]} item={PsychotherapyUKL[15]} onChange={handleChangeEvaluation(15)}/>
                </UKLGroupItems>
                <div className="d-flex flex-row align-items-center flex-wrap mb-2">
                    <label style={{marginRight: 5}}>Врач</label>
                    <div style={{width: 300, marginRight: 15}}>
                        <Select
                            options={[{label: "-", value: 0}, ...state.doctorList.map(v => ({
                                label: v.lname + " " + v.fname + " " + v.sname,
                                value: v.id
                            }))]}
                            currentValue={form.doctorId}
                            onChange={(_, v) => setForm(f => ({...f, doctorId: Number(v)}))}
                        />
                    </div>
                    <span><b>УКЛ</b> {state.sum}</span>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <Button className="btn-outline-danger" style={{marginRight: 5}}
                            onClick={handleReset}>Сбросить</Button>
                    <Button className="btn-outline-primary" onClick={handleSubmit}
                            disabled={!state.enabled}>Записать</Button>
                </div>
            </div>
        </div>
        <Modal
            onClose={p.onClose}
            isOpen={!!state.error}
            title={"Внимание!"}
            body={<div>
                <span className="text-danger">{state.error}</span>
            </div>}
            btnNum={BTN_CLOSE}
        />
        <ModalHistory
            patient={p.patient}
            user={p.user}
            isShow={state.showHistory}
            onClose={_ => setState(s => ({...s, showHistory: false}))}
            isType={UKL_TYPE_VISIT}
        />
    </div>
}

export default EvaluationPsychotherapyUKL
