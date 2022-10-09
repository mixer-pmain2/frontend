import React, {useEffect, useState} from "react"
import {connect} from "react-redux";
import Modal from "components/Modal";
import InputDate from "components/Input/date";
import Select from "components/Input/select";
import {getSprVisitByCode} from "api/spr";
import {SprVisitNTypes} from "configs/ambulance";
import GroupRadio from "components/Input/radio";
import {addSod, getForcedNumber, getSod, postNewForced} from "api/patient";
import Panel from "components/Panel";
import Table from "components/Table";
import InputText from "components/Input/text";
import {formatDate, formatDateToInput} from "utility/string";
import Button from "components/Button";
import {notifyError, notifySuccess} from "components/Notify";



const GetTypeCrime = (v): {name: string, id: number} => {
    if (v >= 105 && v <= 157) return {name: "Против личности", id: 1}
    if (v >= 158 && v <= 204) return {name: "В сфере экономики", id: 2}
    if (v >= 205 && v <= 274) return {name: "Против общ. безоп. и общ. порядка", id: 3}
    if (v >= 248 && v <= 330) return {name: "Против государственной власти", id: 4}
    if (v >= 331 && v <= 352) return {name: "Против военной службы", id: 5}
    if (v >= 353 && v <= 360) return {name: "Против мира и безопасности человека", id: 6}
    return {name: "", id: 0}
}

const mapper = (row: SOD) => {

    return <>
        <td>{formatDate(row.date)}</td>
        <td>{row.section}</td>
        <td>{row.part ? row.part : ""}</td>
    </>
}

type ModalNewForcedProps = {
    show: boolean
    onClose: () => void
    patient: PatientStore
    user: UserStore
    onUpdate?: () => void
}

const ModalNewForced = (p: ModalNewForcedProps) => {
    const [state, setState] = useState<{
        courtList: { label: string, value: number }[]
        viewList: { label: string, value: number }[]
        mehList: { label: string, value: number }[]
        sodList: SOD[]
        target: string
    }>({
        courtList: [],
        viewList: [],
        mehList: [],
        sodList: [],
        target: ""
    })
    const [form, setForm] = useState<ForcedData>({
        actDate: "",
        actNumber: 0,
        conclusionId: 0,
        courtConclusionDate: "",
        dateEnd: "",
        dateView: "",
        doctorId1: 0,
        doctorId2: 0,
        forcedP: 0,
        id: 0,
        patientId: p.patient.id,
        typeId: 0,
        userId: p.user.id,
        courtDate: "",
        courtId: 0,
        viewId: 0,
        mechanism: 0,
        sick: 0,
        number: 0,
        typeCrimeId: 0
    })
    const [formSOD, setFormSOD] = useState<SOD>({
        patientId: p.patient.id,
        date: formatDateToInput(new Date),
        section: 0,
        part: 0
    })

    const handleChangeForm = name => (value) => {
        setForm(f => ({
            ...f,
            [name]: value
        }))
    }

    const loadSOD = ({cache = true}) => {
        getSod({id: p.patient.id, cache: cache})
            .then(res => {
                setState(s => ({
                    ...s,
                    sodList: res
                }))
            })
    }

    const handleSubmitForm = () => {
        postNewForced(form)
            .then(res => {
                if (res.success) {
                    notifySuccess("Данные обновлены")
                    p.onUpdate()
                    p.onClose()
                } else {
                    notifyError(res.message)
                }
            })
    }

    const handleSubmitSod = () => {
        addSod(formSOD)
            .then(res => {
                if (res.success) {
                    notifySuccess("Статья добавлена")
                    loadSOD({cache: false})
                } else {
                    notifyError(res.message)
                }
            })
    }

    useEffect(() => {
        setForm(s => ({
            ...s,
            typeCrimeId: GetTypeCrime(state.sodList?.[0]?.section).id || 0
        }))

    }, [state.sodList])

    useEffect(() => {
        getForcedNumber({patientId: p.patient.id})
            .then(res => {
                if (res.number) {
                    setForm(f => ({
                        ...f,
                        number: res.number
                    }))
                }
            })

        getSprVisitByCode({code: SprVisitNTypes.court})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        courtList: [...res.map(v => ({label: v.name, value: v.code}))]
                    }))
            })

        getSprVisitByCode({code: SprVisitNTypes.view})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        viewList: [{label: "--", value: 0}, ...res.map(v => ({label: v.name, value: v.code}))]
                    }))
            })

        getSprVisitByCode({code: SprVisitNTypes.view})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        viewList: [{label: "--", value: 0}, ...res.map(v => ({label: v.name, value: v.code}))]
                    }))
            })

        getSprVisitByCode({code: SprVisitNTypes.meh})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        mehList: [{label: "--", value: 0}, ...res.map(v => ({label: v.name, value: v.code}))]
                    }))
            })

        loadSOD({cache: true})


    }, [])

    return <Modal
        title={"Новая принудка"}
        style={{minWidth: 800}}
        body={<div className="d-flex flex-row justify-content-start">
            <div style={{marginRight: 15, width: 400}}>
                <div className="mb-3">
                    <label className="form-label">Дата определения суда</label>
                    <InputDate
                        value={form.courtDate}
                        onChange={v => handleChangeForm("courtDate")(v)}
                        cleaner
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Дата получения определения</label>
                    <InputDate
                        value={form.courtConclusionDate}
                        onChange={v => handleChangeForm("courtConclusionDate")(v)}
                        cleaner
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Суд</label>
                    <Select
                        options={state.courtList}
                        currentValue={form.courtId}
                        name={"courtId"}
                        onChange={(name, value) => handleChangeForm(name)(Number(value))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Решение</label>
                    <Select
                        options={state.viewList}
                        currentValue={form.viewId}
                        name={"viewId"}
                        onChange={(name, value) => handleChangeForm(name)(Number(value))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Механизм ООД</label>
                    <Select
                        options={state.mehList}
                        currentValue={form.mechanism}
                        name={"mechanism"}
                        onChange={(name, value) => handleChangeForm(name)(Number(value))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Направленность</label> <span className="text-primary">{GetTypeCrime(state.sodList?.[0]?.section).name}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Заболел</label>
                    <GroupRadio
                        className="flex-column"
                        options={[
                            {
                                label: "До",
                                value: 1
                            },
                            {
                                label: "После",
                                value: 2
                            },
                        ]}
                        name={"sick"}
                        value={form.sick}
                        onChange={e => handleChangeForm(e.target.name)(Number(e.target.value))}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Принудительное лечение {form.number}</label>
                </div>
                <div className="d-flex justify-content-between">
                    <Button className="btn-outline-primary" onClick={handleSubmitForm}>Записать</Button>
                    <Button className="btn-outline-danger" onClick={p.onClose}>Отменить</Button>
                </div>
            </div>
            <Panel style={{width: 400}}>
                <Table
                    columns={["Дата", "Статья", "Часть"]}
                    data={state.sodList}
                    mapper={mapper}
                    pageSize={5}
                />
                <div className="mb-3 d-flex flex-row align-items-center">
                    <label className="form-label mr-15">Дата</label>
                    <InputDate
                        value={formSOD.date}
                        onChange={v => setFormSOD(f => ({...f, date: v}))}
                        cleaner
                    />
                </div>
                <div className="mb-3 d-flex flex-row justify-content-start align-items-center">
                    <label className="form-label mr-15">Стать УК</label>
                    <div className="d-flex flex-row justify-content-between">
                        <InputText
                            type={"number"} value={formSOD.section} style={{marginRight: 5, width: 100}}
                            onChange={e => setFormSOD(f => ({...f, section: Number(e.target.value)}))}
                        />
                        <InputText
                            type={"number"} value={formSOD.part} style={{width: 70}}
                            onChange={e => setFormSOD(f => ({...f, part: Number(e.target.value)}))}
                        />
                    </div>
                </div>
                <Button className="btn-outline-primary" onClick={handleSubmitSod}>Записать</Button>

            </Panel>

        </div>}
        btnNum={0}
        isOpen={p.show}
        onClose={p.onClose}
    />
}

export default connect((state: RootStore) => ({
    user: state.user,
    patient: state.patient
}))(ModalNewForced)
