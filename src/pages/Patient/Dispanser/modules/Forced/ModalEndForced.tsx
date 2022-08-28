import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Modal, {BTN_CLOSE, BTN_CUSTOM, BTN_OK, BTN_SAVE} from "components/Modal";
import InputDate from "components/Input/date";
import {getSprVisitByCode} from "api/spr";
import {SprVisitNTypes} from "configs/ambulance";
import Select from "components/Input/select";
import {postEndForced} from "api/patient";
import {notifyError, notifySuccess} from "components/Notify";
import {formatDateToInput} from "../../../../../utility/string";


type ModalEndForcedProps = {
    onClose?: () => void
    onUpdate?: () => void
    show: boolean
    patient: PatientStore
    user: UserStore
}

const ModalEndForced = (p: ModalEndForcedProps) => {
    const [state, setState] = useState({
        viewList: [] as { label: string, value: number }[]
    })
    const [form , setForm] = useState<ForcedData>({
        actDate: "",
        actNumber: 0,
        conclusionId: 0,
        courtConclusionDate: "",
        courtId: 0,
        dateView: "",
        doctorId1: 0,
        doctorId2: 0,
        forcedP: 0,
        id: 0,
        mechanism: 0,
        number: 0,
        patientId: p.patient.id,
        sick: 0,
        typeCrimeId: 0,
        typeId: 0,
        userId: p.user.id,
        courtDate: formatDateToInput(new Date()),
        dateEnd: formatDateToInput(new Date()),
        viewId: 0
    })

    const handleChangeForm = name => (value) => {
        setForm(f => ({
            ...f,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        postEndForced(form)
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

    useEffect(() => {

        getSprVisitByCode({code: SprVisitNTypes.view})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        viewList: [{label: "--", value: 0}, ...res.map(v => ({label: v.name, value: v.code}))]
                    }))
            })

    }, [])

    return <Modal
        body={<div>
            <div className="mb-3">
                <label className="form-label">Дата начала ПЛ</label>
                <InputDate
                    value={form.courtDate}
                    onChange={v => handleChangeForm("courtDate")(v)}
                    cleaner
                    showYearDropdown={true}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Дата окончания ПЛ</label>
                <InputDate
                    value={form.dateEnd}
                    onChange={v => handleChangeForm("dateEnd")(v)}
                    cleaner
                    showYearDropdown={true}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Вид п. л.</label>
                <Select
                    options={state.viewList}
                    currentValue={form.viewId}
                    name={"viewId"}
                    onChange={(name, value) => handleChangeForm(name)(Number(value))}
                />
            </div>
        </div>}
        btnNum={BTN_CUSTOM|BTN_CLOSE}
        customTitle={"Записать"}
        isOpen={p.show}
        onClose={p.onClose}
        onCustom={handleSubmit}
    />
}

export default connect((state: RootStore) => ({
    user: state.user,
    patient: state.patient,
}))(ModalEndForced)
