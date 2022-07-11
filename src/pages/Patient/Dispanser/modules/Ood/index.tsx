import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {PageTitle} from "components/Title";
import {dispanserSubModules, loadComponent} from "consts/app";
import {configurations} from "./config";
import Checkbox from "components/Input/checkbox";
import {addOod, addSod, getFindSection29, getOodLast, getSection22, getSod} from "store/actions/patient";
import Table from "components/Table";
import {formatDate, formatDateToInput} from "utility/string";
import Button from "components/Button";
import Icons from "components/Icons";
import Section22 from "../Section22";
import {loadingAdd, loadingRemove} from "../../../../../store/actions/application";
import {applicationStore} from "../../../../../store/reducers/application";
import {notifyError, notifySuccess} from "../../../../../components/Notify";
import Modal, {BTN_CLOSE, BTN_OK} from "../../../../../components/Modal";
import InputDate from "../../../../../components/Input/date";
import InputText from "../../../../../components/Input/text";


type CheckOptionsProps = {
    name
    title
    options: {
        label
        value
    }[]
    value: number
    onChange: (name: string, value: number) => (e: any) => void
}

const CheckOptions = ({name, title, options, value, onChange}: CheckOptionsProps) => <div style={{minWidth: 200}}>
    <label className="fs-5 text">{title}</label>
    {
        options.map((v, i) =>
            <Checkbox
                key={i} name={`${name}${i}`}
                checked={(value & v.value) === v.value}
                title={v.label}
                onChange={onChange(name, v.value)}
            />
        )
    }
</div>

const mapper = (row: SOD) => <>
    <td>{formatDate(row.date)}</td>
    <td>{row.section}</td>
    <td>{row.part}</td>
</>

const mapperSection29 = (row: FindSection29) => <>
    <td>{formatDate(row.dateStart)}</td>
    <td>{row.diagnose}</td>
    <td>{formatDate(row.dateEnd)}</td>
    <td>{row.section}</td>
</>

const mapperSection22 = (row: Section22) => <>
    <td>{formatDate(row.dateStart)}</td>
    <td>{formatDate(row.dateEnd)}</td>
    <td>{row.section}</td>
    <td>{row.part}</td>
</>

type OodProps = {
    dispatch
    user: UserStore
    patient: PatientStore
    application: ApplicationStore
}

const Ood = (p: OodProps) => {
    const [dataSod, setDataSod] = useState<SOD[]>([])
    const [section29, setSection29] = useState<FindSection29[]>([])
    const [section22, setSection22] = useState<Section22[]>([])
    const [form, setForm] = useState<OOD>({
        danger: 0,
        syndrome: 0,
        difficulties: 0,
        attitude: 0,
        userId: p.user.id,
        patientId: p.patient.id
    })
    const [formSOD, setFormSOD] = useState<SOD>({
        patientId: p.patient.id,
        date: formatDateToInput(new Date()),
        section: 0,
        part: 0
    })
    const [state, setState] = useState({
        showModalAddOod: false
    })

    const onChange = (name, value) => (e) =>
        setForm(f => ({
            ...f,
            [name]: e.target.checked ? f[name] + value : f[name] - value
        }))

    const saveOod = () => {
        p.dispatch(addOod(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("ООД обновлено")
                    getDataOodLast(false)
                } else {
                    notifyError(res.message)
                }
            })
    }

    const handleAddSod = () => {
        p.dispatch(addSod(formSOD))
            .then(res => {
                if (res.success) {
                    notifySuccess("Стать добавлена")
                    getDataSod(false)
                    setState(s => ({
                        ...s,
                        showModalAddOod: false
                    }))
                } else {
                    notifyError(res.message)
                }
            })
    }

    const getDataOodLast = (cache = true) => {
        p.dispatch(loadingAdd(loadComponent.ood.oodLast))
        p.dispatch(getOodLast({id: p.patient?.id, cache}))
            .then(res => {
                setForm(f => ({
                    ...f,
                    ...res,
                    userId: p.user.id,
                    patientId: p.patient.id
                }))
            })
            .finally(() => p.dispatch(loadingRemove(loadComponent.ood.oodLast)))
    }

    const getDataSod = (cache = true) => {
        p.dispatch(loadingAdd(loadComponent.ood.sod))
        p.dispatch(getSod({id: p.patient?.id, cache}))
            .then(res => {
                setDataSod(res)
            })
            .finally(() => p.dispatch(loadingRemove(loadComponent.ood.sod)))
    }

    useEffect(() => {
        getDataOodLast()
        getDataSod()
        p.dispatch(loadingAdd(loadComponent.ood.findSection29))
        p.dispatch(loadingAdd(loadComponent.ood.section22))
        p.dispatch(getFindSection29({id: p.patient?.id}))
            .then(res => {
                setSection29(res)
            })
            .finally(() => p.dispatch(loadingRemove(loadComponent.ood.findSection29)))
        p.dispatch(getSection22({id: p.patient?.id}))
            .then(res => {
                setSection22(res)
            })
            .finally(() => p.dispatch(loadingRemove(loadComponent.ood.section22)))
    }, [])

    return <div>
        <PageTitle title={dispanserSubModules.ood.title}/>
        <hr/>
        <div className="d-flex flex-row justify-content-start">
            <div style={{marginRight: 15, marginBottom: 5}}>
                <div className="d-flex flex-row">
                    <Button
                        onClick={() => setState(s => ({...s, showModalAddOod: true}))}
                        className="btn-outline-primary" style={{marginRight: 15}}
                    >{Icons.event.add}</Button>
                    <label className="fs-5 text mb-2">{"Совершенные ООД"}</label>
                </div>
                <Table
                    style={{minWidth: 350}}
                    data={dataSod || []}
                    columns={["Дата ООД", "Статья", "Часть"]}
                    mapper={mapper}
                    loading={p.application.loadingList.indexOf(loadComponent.ood.sod) > 0}
                />
            </div>
            <div style={{marginRight: 15, marginBottom: 5}}>
                <label className="fs-5 text mb-2">{"Недобр. поступления (29cт А, 35ст)"}</label>
                <Table
                    style={{minWidth: 400}}
                    columns={["Дата пост.", "Диагноз", "Дата выписки", ""]}
                    data={section29 || []}
                    mapper={mapperSection29}
                    loading={p.application.loadingList.indexOf(loadComponent.ood.findSection29) > 0}
                />
            </div>
            <div style={{marginRight: 15, marginBottom: 5}}>
                <label className="fs-5 text mb-2">{"22  Статья"}</label>
                <Table
                    style={{minWidth: 400}}
                    columns={["Начало", "Окончание", "Статья", "Часть"]}
                    data={section22 || []}
                    mapper={mapperSection22}
                    loading={p.application.loadingList.indexOf(loadComponent.ood.section22) > 0}
                />
            </div>
        </div>
        <hr/>
        <div className="d-flex flex-wrap">
            <div style={{marginRight: 15, marginBottom: 15}}>
                <CheckOptions
                    title={"Общественная опасность"}
                    onChange={onChange}
                    name={"danger"}
                    value={form.danger}
                    options={configurations.publicDanger}
                />
            </div>
            <div style={{marginRight: 15, marginBottom: 15}}>
                <CheckOptions
                    title={"Синдром"}
                    onChange={onChange}
                    name={"syndrome"}
                    value={form.syndrome}
                    options={configurations.syndrome}
                />
            </div>
            <div>
                <div style={{marginRight: 15, marginBottom: 15}}>
                    <CheckOptions
                        title={"Трудности лечения"}
                        onChange={onChange}
                        name={"difficulties"}
                        value={form.difficulties}
                        options={configurations.difficulties}
                    />
                </div>
                <div style={{marginRight: 15, marginBottom: 15}}>
                    <CheckOptions
                        title={"Отношение к лечению"}
                        onChange={onChange}
                        name={"attitude"}
                        value={form.attitude}
                        options={configurations.attitude}
                    />
                </div>
            </div>
            <div style={{maxWidth: 200}}>
                <Button className="btn-outline-primary" onClick={saveOod}>Сохранить</Button>
            </div>
        </div>
        <Modal
            title={"Добавить ООД"}
            isOpen={state.showModalAddOod}
            onClose={() => setState(s => ({...s, showModalAddOod: false}))}
            body={<div>
                <div className="d-flex flex-row align-items-center" style={{marginBottom: 5}}>
                    <label style={{marginRight: 10, minWidth: 100}}>Дата ООД</label>
                    <InputDate
                        value={formSOD.date} onChange={v => setFormSOD(f => ({...f, date: v}))}
                    />
                </div>
                <div className="d-flex flex-row align-items-center" style={{marginBottom: 5}}>
                    <label style={{marginRight: 10, minWidth: 100}}>Статья</label>
                    <InputText
                        value={formSOD.section}
                        type={"number"}
                        onChange={e => setFormSOD(f => ({
                            ...f,
                            section: Number(e.target.value)
                        }))}/>
                </div>
                <div className="d-flex flex-row align-items-center">
                    <label style={{marginRight: 10, minWidth: 100}}>Часть</label>
                    <InputText
                        value={formSOD.part} type={"number"}
                        onChange={e => setFormSOD(f => ({
                            ...f,
                            part: Number(e.target.value)
                        }))}
                    />
                </div>
            </div>}
            btnNum={BTN_OK + BTN_CLOSE}
            onOk={handleAddSod}
        />
    </div>
}

export default connect((state: RootStore) => ({
    user: state.user,
    patient: state.patient,
    application: state.application
}))(Ood)
