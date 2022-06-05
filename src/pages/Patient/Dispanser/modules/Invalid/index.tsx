import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {addInvalid, getInvalid, updInvalid} from "store/actions/patient";

import Table from "components/Table";
import {PageTitle} from "components/Title";
import Icons from "components/Icons";
import InputDate from "components/Input/date";
import Panel from "components/Panel";
import Checkbox from "components/Input/checkbox";
import Button from "components/Button";

import {formatDate} from "utility/string";
import {dispanserSubModules} from "consts/app";
import {Access} from "consts/user";
import TableKind from "./TableKind";
import TableAnomaly from "./TableAnomaly";
import TableLimit from "./TableLimit";
import TableReason from "./TableReason";
import {notifyError, notifySuccess} from "../../../../../components/Notify";

type NewInvalidProps = {
    onCancel
    form: FormProps
    setForm
    state
    onCreate
}


const NewInvalid = ({onCancel, form, setForm, state, onCreate}: NewInvalidProps) => {
    let callCancel = () => {
    }

    const handleSelectKind = v => {
        setForm({
            ...form,
            kind: v
        })
        callCancel()
    }

    const handleSelectReason = v =>
        setForm({
            ...form,
            reason: v
        })

    const handleSelectAnomaly = v =>
        setForm({
            ...form,
            anomaly: v
        })

    const handleSelectLimit = v =>
        setForm({
            ...form,
            limit: v
        })

    const onChangeNewInvalidDateStart = (v: string) => {
        setForm({
            ...form,
            date_start: v
        })
    }

    const onChangeNewInvalidDateEnd = (v: string) => {
        setForm({
            ...form,
            date_end: v
        })
    }

    const onChangeNewInvalidInfinity = (v: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            isInfinity: v.target.checked
        })
    }

    const onCancelReason = (call) => {
        callCancel = call
    }

    const HeaderInvalidTable = ({children}) => {
        return <div className="">
            - {children}
        </div>
    }

    return <>
        <Panel className="mb-2">
            <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-row flex-wrap align-items-center">
                    <label className="form-label" style={{marginRight: 5}}>Дата начала</label>
                    <InputDate
                        value={form.date_start}
                        onChange={onChangeNewInvalidDateStart}
                        style={{width: 120, marginRight: 15}}
                    />
                    <label className="form-label" style={{marginRight: 5}}>Дата окончания</label>
                    <InputDate
                        value={form.date_end}
                        onChange={onChangeNewInvalidDateEnd}
                        style={{width: 120, marginRight: 15}}
                        disabled={form.isInfinity}
                    />
                    <div className="d-flex align-items-center">
                        <Checkbox
                            checked={form.isInfinity}
                            name={"infinity"}
                            onChange={onChangeNewInvalidInfinity}
                            title={"Бессроный"}
                        />
                    </div>
                </div>
                <div className="d-flex align-items-end">
                    <div>
                        <Button
                            className="btn-outline-primary"
                            style={{marginRight: 5}}
                            disabled={!(form.kind && (form.reason || (form.kind == 10 && form.anomaly && form.limit)))}
                            onClick={onCreate}
                        >Записать</Button>
                        <Button className="btn-outline-danger" onClick={onCancel}>Отменить</Button>
                    </div>
                </div>
            </div>
        </Panel>
        <Panel>
            <div className="d-flex flex-row">
                <div style={{marginRight: 15, flex: 1}}>
                    <HeaderInvalidTable>{state.dataKind[form.kind]}</HeaderInvalidTable>
                    <TableKind onSelect={handleSelectKind} data={state.dataKind}/>
                </div>
                {form.kind != 10 && <div style={{marginRight: 15, flex: 1}}>
                    <HeaderInvalidTable>{state.dataReason[form.reason]}</HeaderInvalidTable>
                    <TableReason onSelect={handleSelectReason} data={state.dataReason} onCancelSelect={onCancelReason}/>
                </div>}
                {form.kind == 10 && <div style={{marginRight: 15, flex: 1}}>
                    <HeaderInvalidTable>{state.dataAnomaly[form.anomaly]}</HeaderInvalidTable>
                    <TableAnomaly onSelect={handleSelectAnomaly} data={state.dataAnomaly}/>
                </div>}
                {form.kind == 10 && <div style={{flex: 1}}>
                    <HeaderInvalidTable>{state.dataLimit[form.limit]}</HeaderInvalidTable>
                    <TableLimit onSelect={handleSelectLimit} data={state.dataLimit}/>
                </div>}
            </div>
        </Panel>
    </>
}

const SetDateDocument = ({onCancel, form, setForm, state, onCreate}) => {
    const onChangeNewInvalidDateDocument = (v: string) => {
        setForm({
            ...form,
            date_document: v
        })
    }
    return <>
        <Panel className="mb-2">
            <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-row flex-wrap align-items-center">
                    <label className="form-label" style={{marginRight: 5}}>Дата сдачи документов</label>
                    <InputDate
                        value={form.date_document}
                        onChange={onChangeNewInvalidDateDocument}
                        style={{width: 120, marginRight: 15}}
                    />
                </div>
                <div className="d-flex align-items-end">
                    <div>
                        <Button className="btn-outline-primary" style={{marginRight: 5}} onClick={onCreate}>Записать</Button>
                        <Button className="btn-outline-danger" onClick={onCancel}>Отменить</Button>
                    </div>
                </div>
            </div>
        </Panel>
    </>
}

type InvalidProps = {
    dispatch: (p: any) => any
    patient: PatientStore
    user: UserStore
    application: ApplicationStore
}

type FormProps = {
    date_start?: string
    date_end?: string
    date_document?: string
    isInfinity?: boolean
    kind?: number
    anomaly?: number
    limit?: number
    reason?: number
    patientId: number
    doctId: number
}

const Invalid = ({dispatch, patient, user, application}: InvalidProps) => {
    const [state, setState] = useState<{
        isAccessed: boolean
        visibleNewInvalid: boolean
        visibleSetDocument: boolean
        dataKind: { [name: number]: string }
        dataAnomaly: { [name: number]: string }
        dataLimit: { [name: number]: string }
        dataReason: { [name: number]: string }
    }>({
        dataAnomaly: {},
        dataLimit: {},
        dataKind: {},
        dataReason: {},
        isAccessed: Boolean(user.access[user.unit] & Access.dispanser["Работа с инвалидностью"]),
        visibleNewInvalid: false,
        visibleSetDocument: false,
    })

    const [form, setForm] = useState<FormProps>({
        patientId: patient.id,
        doctId: user.id,
        isInfinity: false
    })

    const handleShowNewInvalid = () => {
        setState({
            ...state,
            visibleNewInvalid: !state.visibleNewInvalid,
            visibleSetDocument: false
        })
        setForm({
            patientId: patient.id,
            doctId: user.id,
            isInfinity: false
        })
    }
    const handleShowChangeDate = () => {
        setState({
            ...state,
            visibleNewInvalid: false,
            visibleSetDocument: !state.visibleSetDocument
        })
        setForm({
            patientId: patient.id,
            doctId: user.id,
            isInfinity: false
        })
    }

    const handleCancel = () => {
        setState({
            ...state,
            visibleNewInvalid: false,
            visibleSetDocument: false
        })
    }

    const handleNewInvalid = () => {
        dispatch(addInvalid(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Инвалидность добавлена")
                    handleCancel()
                } else {
                    notifyError(res.message)
                }
            })
    }

    const handleUpdDateDoucument = () => {
        dispatch(updInvalid(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Дата сдачи документов обновлена")
                    handleCancel()
                } else {
                    notifyError(res.message)
                }
            })
    }


    useEffect(() => {
        let reason: { [name: number]: string } = {}
        Object.keys(application.spr.inv_reason).map(v => {
            if (form.kind == 99) {
                if (Number(v) > 90) {
                    reason[v] = application.spr.inv_reason[v]
                }
            } else {
                if (Number(v) <= 90) {
                    reason[v] = application.spr.inv_reason[v]
                }
            }
        })
        setState({
            ...state,
            dataReason: reason,
        })
        setForm(form => {
            delete form['reason']
            delete form['limit']
            delete form['anomaly']
            return {
                ...form,
            }
        })
    }, [form.kind])

    useEffect(() => {
        dispatch(getInvalid({patientId: patient.id}))
        setState({
            ...state,
            dataKind: application.spr.inv_kind,
            dataAnomaly: application.spr.inv_anomaly,
            dataLimit: application.spr.inv_limit,
            dataReason: application.spr.inv_reason
        })
    }, [])

    const mapper = (v) => {
        let dateChange = formatDate(v.dateChange) == "31.12.2222" ? "бессрочно" : formatDate(v.dateChange)
        dateChange = (["30.12.1899", "26.10.1917"].indexOf(dateChange) + 1) ? "" : dateChange
        let dateEnd = formatDate(v.dateEnd) == "31.12.2222" ? "бессрочно" : formatDate(v.dateEnd)
        dateEnd = (["30.12.1899", "26.10.1917"].indexOf(dateEnd) + 1) ? "" : dateEnd

        return <>
            <td>{formatDate(v.dateBegin)}</td>
            <td>{dateEnd}</td>
            <td>{dateChange}</td>
            <td>{v.kindS}</td>
            <td>{v.reasonS}</td>
        </>
    }
    console.log(form)
    return <div>
        <PageTitle title={dispanserSubModules.invalid.title}/>
        {state.isAccessed && <div className="d-flex flex-row" style={{marginBottom: 15}}>
            <button className="btn btn-outline-primary" style={{marginRight: 5}}
                    onClick={handleShowNewInvalid}>
                {Icons.event.add}
            </button>
            {patient.invalid?.length > 0 &&
            <button className="btn btn-outline-primary" onClick={handleShowChangeDate}>Сдача документов</button>}
        </div>}
        <Table
            columns={["Начало", "Конец", "Сдача док.", "Группа", "Причина"]}
            data={patient?.invalid || []}
            mapper={mapper}
            style={{marginBottom: 15}}
        />
        {state.visibleNewInvalid && <NewInvalid
            form={form}
            setForm={setForm}
            onCancel={handleCancel}
            state={state}
            onCreate={handleNewInvalid}
        />}
        {state.visibleSetDocument && <SetDateDocument
            form={form}
            setForm={setForm}
            onCancel={handleCancel}
            state={state}
            onCreate={handleUpdDateDoucument}
        />}
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user,
    application: state.application
}))(Invalid)
