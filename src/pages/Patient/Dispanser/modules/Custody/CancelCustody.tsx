import React, {useEffect, useState} from "react";

import {formatDateToInput} from "utility/string";
import InputDate from "components/Input/date";
import Button from "components/Button";
import {connect} from "react-redux";
import {cancelCustody} from "store/actions/patient";
import {notifyError, notifySuccess} from "../../../../../components/Notify";
import {loadingAdd, loadingRemove} from "../../../../../store/actions/application";

type CancelCustodyProps = {
    application: ApplicationStore
    user: UserStore
    patient: PatientStore
    dispatch: any
    onClose: () => void
    data?: PatientCustodyStore
}

const CancelCustody = (p: CancelCustodyProps) => {
    const {dispatch, patient, user} = p
    const [form, setForm] = useState({
        patientId: patient.id,
        DoctId: user.id,
        DateStart: p.data?.dateStart,
        dateEnd: formatDateToInput(new Date()),
    })

    const setDate = (v) => {
        setForm(f => ({
            ...f,
            dateEnd: v
        }))
    }

    const handleCancelCustody = async () => {
        dispatch(loadingAdd("upd_custody"))
        await dispatch(cancelCustody(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Запись обновлена")
                } else {
                    notifyError(res.message)
                }
            })
        dispatch(loadingRemove("upd_custody"))
    }

    useEffect(() => {
        setForm({
            ...form,
            DateStart: p.data?.dateStart
        })

    }, [p.data])

    return <div className="d-flex flex-row align-items-end">
        <InputDate
            isRow={false}
            title={"Дата решения суда"}
            value={form.dateEnd}
            onChange={setDate}
            style={{marginRight: 5}}
            showYearDropdown
            min={"1900-01-01"}
        />
        <Button className="btn-outline-danger mb-1" onClick={p.onClose} style={{marginRight: 5}}>Отмента</Button>
        <Button className="btn-outline-primary mb-1" onClick={handleCancelCustody}>Записать</Button>
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user,
    application: state.application
}))(CancelCustody)
