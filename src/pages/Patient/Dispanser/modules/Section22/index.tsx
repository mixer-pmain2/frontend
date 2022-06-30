import React, {memo, useEffect, useState} from "react";
import {connect} from "react-redux";
import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";
import Button from "components/Button";
import Icons from "components/Icons";
import {addSection22, getSection22} from "store/actions/patient";
import {Access} from "consts/user";
import Table from "components/Table";
import {formatDate, formatDateToInput} from "utility/string";
import Panel from "components/Panel";
import InputDate from "components/Input/date";
import InputText from "components/Input/text";
import {notifyError, notifySuccess} from "../../../../../components/Notify";


const mapper = (row: PatientSection22Store) => <>
    <td>{formatDate(row.dateStart)}</td>
    <td>{formatDate(row.dateEnd)}</td>
    <td>{row.section}</td>
    <td>{row.part}</td>
</>


type Section22Props = {
    dispatch
    patient: PatientStore
    user: UserStore
}

const Section22 = (p: Section22Props) => {
    const [state, setState] = useState({
        adding: p.user.access[p.user.unit] & Access.dispanser["Работа с принудкой"],
        section22: [],
        isOpenAddSection: false
    })
    const [form, setForm] = useState({
        insWho: p.user.id,
        patientId: p.patient.id,
        dateStart: formatDateToInput(new Date()),
        dateEnd: formatDateToInput(new Date()),
        section: 0,
        part: 0
    })

    const handleChangeForm = name => (value) => {
        setForm(f => ({
            ...f,
            [name]: value
        }))
    }

    const handleChangeFormInput = (e) => {
        let value = e.target.value;
        if (["section", "part"].indexOf(e.target.name)+1)
            value = Number(value)
        setForm(f => ({
            ...f,
            [e.target.name]: value
        }))
    }

    const toggleShowAddSection = () => {
        setState({
            ...state,
            isOpenAddSection: !state.isOpenAddSection
        })
    }

    const getData = () => {
        p.dispatch(getSection22({id: p.patient.id, cache: false}))
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        section22: res
                    }))
                }
            })
    }

    const onSubmit = () => {
        p.dispatch(addSection22(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Статья добавлена")
                    getData()
                    setState(s => ({
                        ...s,
                        isOpenAddSection: false
                    }))
                } else {
                    notifyError(res.message)
                }
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div>
        <PageTitle title={dispanserSubModules.section22.title}/>
        {state.adding ? <div>
            <Button className="btn-outline-primary" onClick={toggleShowAddSection}>{Icons.event.add}</Button>
            <hr/>
        </div> : null}

        <Table
            columns={["Начало", "Конец", "Статья", "Часть"]}
            data={state.section22}
            mapper={mapper}
        />
        {state.isOpenAddSection && <Panel>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column align-items-end" style={{maxWidth: 400, marginRight: 15}}>
                    <div className="d-flex flex-row align-items-center mb-1">
                        <label className="form-label" style={{marginRight: 5}}>Начало срока</label>
                        <InputDate
                            value={form.dateStart}
                            onChange={handleChangeForm("dateStart")}
                        />
                    </div>
                    <div className="d-flex flex-row align-items-center mb-1">
                        <label className="form-label" style={{marginRight: 5}}>Окончание срока</label>
                        <InputDate
                            value={form.dateEnd}
                            onChange={handleChangeForm("dateEnd")}
                        />
                    </div>
                    <div className="d-flex flex-row align-items-center mb-1">
                        <label className="form-label" style={{marginRight: 5}}>Статья УК</label>
                        <InputText
                            type={"number"}
                            name={"section"}
                            value={form.section}
                            onChange={handleChangeFormInput}
                        />
                    </div>
                    <div className="d-flex flex-row align-items-center mb-1">
                        <label className="form-label" style={{marginRight: 5}}>Часть</label>
                        <InputText
                            type={"number"}
                            name={"part"}
                            value={form.part}
                            onChange={handleChangeFormInput}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column" style={{maxWidth: 200}}>
                    <Button className="btn-outline-danger mb-1" onClick={toggleShowAddSection}>Отменить</Button>
                    <Button className="btn-outline-primary" onClick={onSubmit}>Записать</Button>
                </div>

            </div>
        </Panel>}

    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user
}))(Section22)
