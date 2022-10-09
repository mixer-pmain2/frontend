import React, {memo, useCallback, useEffect, useMemo, useState} from "react";

import Modal, {BTN_CLOSE, BTN_CUSTOM, BTN_SAVE} from "components/Modal";
import InputDate from "components/Input/date";
import Select from "components/Input/select";
import GroupRadio from "components/Input/radio";
import InputText from "components/Input/text";
import {formatDateToInput} from "../../../../../utility/string";
import {getForced, postForced} from "../../../../../api/patient";
import {getDoctors, getSprVisitByCode} from "../../../../../api/spr";
import {connect} from "react-redux";
import {SprVisitNTypes} from "../../../../../configs/ambulance";
import {notifyError, notifyInfo, notifySuccess} from "../../../../../components/Notify";


type ViewedFormProps = {
    data: ViewedData
    application: ApplicationStore
    user: UserStore
    patient: PatientStore
    callbackSubmit: (any) => any
    onClose?: () => void
}

const ViewedForm = (p: ViewedFormProps) => {
    const [state, setState] = useState<{
        doctorList: Doctor[]
        conclusionList: { label: string, value: number }[]
        viewList: { label: string, value: number }[]
        courtList: { label: string, value: number }[]
    }>({
        doctorList: [],
        conclusionList: [],
        viewList: [],
        courtList: [],
    })
    const [form, setForm] = useState<ForcedData>({
        dateEnd: "",
        forcedP: 0,
        id: 0,
        mechanism: 0,
        number: p.data.number,
        patientId: p.patient.id,
        sick: 0,
        typeCrimeId: 0,
        dateView: formatDateToInput(new Date()),
        doctorId1: 0,
        doctorId2: 0,
        conclusionId: 0,
        viewId: 0,
        actNumber: 0,
        actDate: formatDateToInput(new Date()),
        courtId: 0,
        typeId: 0,
        courtDate: "",
        courtConclusionDate: "",
        userId: p.user.id
    })

    const handleChangeForm = name => (value) => {
        setForm(f => ({
            ...f,
            [name]: value
        }))
    }

    const getDoctorList = () => {
        let l = state.doctorList.map(v => ({
            label: `${v.lname} ${v.fname?.[0]}. ${v.sname?.[0]}.`,
            value: v.id
        }))
        l = [{label: "--", value: 0}, ...l]
        if (l.filter(v => v.value == form.doctorId1).length === 0) {
            l.push({label: p.data.doctorName1, value: form.doctorId1})
        }
        if (l.filter(v => v.value == form.doctorId2).length === 0) {
            l.push({label: p.data.doctorName2, value: form.doctorId2})
        }
        return l
    }

    const cleanDate = (d: Date) => {
        if (d.getFullYear() < 1900)
            return ""
        return d
    }

    const loadForced = () => {
        getForced({id: p.data.id, cache: false})
            .then(res => {
                let d = res
                let typeId = 0
                switch (d.typeId) {
                    case 1:
                        typeId = 2
                        break
                    default:
                        typeId = d.typeId
                }
                d.courtConclusionDate = cleanDate(new Date(d.courtConclusionDate)) && formatDateToInput(new Date(d.courtConclusionDate))
                d.actDate = cleanDate(new Date(d.actDate)) && formatDateToInput(new Date(d.actDate))
                d.courtDate = cleanDate(new Date(d.courtDate)) && formatDateToInput(new Date(d.courtDate))
                d.dateView = formatDateToInput(new Date(d.dateView))
                d.dateEnd = cleanDate(new Date(d.dateEnd)) && formatDateToInput(new Date(d.dateEnd))
                setForm(s => ({
                    ...s,
                    ...d,
                    typeId: typeId,
                    userId: s.userId
                }))
            })
    }

    const handleSubmit = (callback: any) => {
        console.log(form)
        postForced(form)
            .then(res => {
                if (res.success) {
                    notifySuccess("Данные обновлены")
                    callback && callback()
                    p.onClose()
                } else {
                    notifyError(res.message)
                }
            })
    }
    p.callbackSubmit(handleSubmit)

    useEffect(() => {
        getDoctors({unit: p.user.unit})
            .then(res => {
                setState(s => ({
                    ...s,
                    doctorList: res
                }))
            })

        getSprVisitByCode({code: SprVisitNTypes.conclusion})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        conclusionList: [{label: "--", value: 0}, ...res.map(v => ({label: v.name, value: v.code}))]
                    }))
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

        p.data.id > 0 && loadForced()

    }, [])

    return <div className="d-flex flex-row justify-content-between">
        <div style={{width: 360}}>
            <div className="mb-3">
                <label className="form-label">Дата осмотра</label>
                <InputDate
                    value={form.dateView}
                    onChange={handleChangeForm("dateView")}
                    showYearDropdown={true}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Врачи, проводившие осмотр</label>
                <div style={{marginBottom: 5}}>
                    <Select
                        options={getDoctorList()}
                        currentValue={form.doctorId1}
                        name={"doctorId1"}
                        onChange={(name, value) => handleChangeForm(name)(Number(value))}
                    />
                </div>
                <Select
                    options={getDoctorList()}
                    currentValue={form.doctorId2}
                    name={"doctorId2"}
                    onChange={(name, value) => handleChangeForm(name)(Number(value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Вид осмотра</label>
                <GroupRadio
                    className="flex-column"
                    options={[
                        {
                            label: "Плановый",
                            value: 2
                        },
                        {
                            label: "Консультативный",
                            value: 4
                        },
                        {
                            label: "Без осмотра (из ПБСТИН)",
                            value: 3
                        },
                    ]}
                    name={"typeId"}
                    value={form.typeId}
                    onChange={e => handleChangeForm(e.target.name)(Number(e.target.value))}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Заключение</label>
                <Select
                    options={state.conclusionList}
                    currentValue={form.conclusionId}
                    name={"conclusionId"}
                    onChange={(name, value) => handleChangeForm(name)(Number(value))}
                />
            </div>
        </div>
        <div style={{width: 360}}>
            <div>
                <div className="mb-3">
                    <label className="form-label">№ акта</label>
                    <InputText
                        type={"number"}
                        value={form.actNumber} onChange={e => handleChangeForm("actNumber")(Number(e.target.value))}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Дата акта</label>
                    <InputDate
                        value={form.actDate}
                        onChange={v => handleChangeForm("actDate")(v)}
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
                    <label className="form-label">Дата заседания</label>
                    <InputDate
                        value={form.courtDate}
                        onChange={v => handleChangeForm("courtDate")(v)}
                        cleaner
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
                    <label className="form-label">Дата получения</label>
                    <InputDate
                        value={form.courtConclusionDate}
                        onChange={v => handleChangeForm("courtConclusionDate")(v)}
                        cleaner
                    />
                </div>
            </div>
        </div>
    </div>
}

const ViewedFormComponent = connect((state: RootStore) => ({
    application: state.application,
    user: state.user,
    patient: state.patient,
}))(ViewedForm)

type NewViewedProps = {
    show: boolean
    onClose: () => void
    viewedRow: ViewedData
    onUpdate?: () => void
}

const NewViewed = (p: NewViewedProps) => {
    let callbackSubmit = (any) => {
    }
    const setCallBackSubmit = (f) => {
        callbackSubmit = f
    }
    const handleSubmit = () => {
        callbackSubmit(p.onUpdate)
        // p.onUpdate && p.onUpdate()
    }

    return <Modal
        title={"Осмотр"}
        style={{minWidth: 800}}
        body={<ViewedFormComponent
            data={p.viewedRow}
            callbackSubmit={setCallBackSubmit}
            onClose={p.onClose}
        />}
        btnNum={BTN_CLOSE | BTN_CUSTOM}
        customTitle={"Записать"}
        isOpen={p.show}
        onClose={p.onClose}
        onCustom={handleSubmit}
    />
}

export default NewViewed
