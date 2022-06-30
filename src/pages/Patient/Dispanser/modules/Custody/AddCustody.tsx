import React, {useCallback, useMemo, useState} from "react";
import {connect} from "react-redux";

import Table from "components/Table";
import InputDate from "components/Input/date";
import Button from "components/Button";
import {formatDateToInput} from "utility/string";
import * as actionPatient from "store/actions/patient"
import {notifyError, notifySuccess} from "components/Notify";
import {loadingAdd, loadingRemove} from "store/actions/application";


const sprMapper = (row: string[]) => {
    return <td>{row}</td>
}

type AddCustodyProps = {
    onClose: () => void
    application: ApplicationStore
    user: UserStore
    patient: PatientStore
    dispatch: any
}

const AddCustody = (p: AddCustodyProps) => {
    const {application, dispatch, patient, user} = p
    const [form, setForm] = useState<{
        patientId: number,
        doctId: number,
        dateStart: string
        custody?: string
    }>({
        doctId: user.id,
        patientId: patient.id,
        dateStart: formatDateToInput(new Date())
    })
    const sprCustodyWho = useMemo(() => Object.values(application.spr.custody.who), [application.spr.custody.who])

    const setDate = (v) => {
        setForm(f => ({
            ...f,
            dateStart: v
        }))
    }

    const setCustody = (v) => {
        const index = Object.values(p.application.spr?.custody?.who).indexOf(v)
        setForm(f => ({
            ...f,
            custody: Object.keys(p.application.spr?.custody?.who)[index]
        }))
    }

    const NewCustody = () => {
        dispatch(loadingAdd("insert_custody"))
        dispatch(actionPatient.addCustody(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Опекун добавлен")
                } else {
                    notifyError(res.message)
                }
            })
        dispatch(loadingRemove("insert_custody"))
    }

    return <div className="d-flex flex-row ">
        <div style={{width: 300, marginRight: 15}}>
            <Table
                columns={["Наличие опекуна"]}
                data={sprCustodyWho}
                mapper={sprMapper}
                selecting={true}
                onClick={setCustody}
            />

        </div>
        <div className="d-flex flex-column" style={{width: 150}}>
            <InputDate title={"Дата решения суда"} isRow={false} value={form.dateStart} onChange={setDate} className="mb-5"/>
            <Button className="btn-outline-danger mb-1" onClick={p.onClose}>Отмена</Button>
            <Button className="btn-outline-primary mb-1" onClick={NewCustody}>Записать</Button>
        </div>
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user,
    application: state.application
}))(AddCustody)
