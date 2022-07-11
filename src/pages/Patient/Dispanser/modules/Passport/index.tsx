import React, {memo, useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";

import {PageTitle} from "components/Title";
import {dispanserSubModules} from "consts/app";
import Panel from "components/Panel";
import InputText from "components/Input/text";
import GroupRadio from "components/Input/radio";
import Button from "components/Button";
import Icons from "components/Icons";
import {Access} from "consts/user";
import {updAddress, updPassport} from "store/actions/patient";
import {notifyError, notifySuccess} from "components/Notify";
import Table from "components/Table";
import {findArea, findDistrict, findRegion, findRepublic, findStreet} from "store/actions/application";
import * as patientActions from "../../../../../store/actions/patient";


const FindSideComponent = ({name, column, find, state, form, onChange, onClick, style = {}}) => {
    console.log(name)
    return <div className="flex-grow-1" style={style}>
        <InputText
            style={{marginBottom: 10}}
            value={find?.[name]}
            name={name}
            onChange={onChange}
        />
        <div>
            {Icons.event.arrowRight} {state?.[`${name}Title`]}
        </div>
        <Table
            style={{maxWidth: 250, minWidth: 230}}
            columns={column}
            data={state?.[name]}
            selecting={form?.[name]}
            mapper={mapper}
            onClick={onClick(name)}
        />
    </div>
}

const FindSide = memo(FindSideComponent)

const mapper = (row) => <>
    <td>
        <div>{Icons.event.arrowRightLine} {row.name}</div>
    </td>
</>

type PassportProps = {
    dispatch
    patient: PatientStore
    user: UserStore
}

const Passport = (p: PassportProps) => {
    const [find, setFind] = useState<{
        republic: string
        region: string
        district: string
        area: string
        street: string
    }>({
        republic: "РОС",
        region: "ОМС",
        district: "",
        area: "ОМСК",
        street: ""
    })
    const [state, setState] = useState<{
        showEditAddress: boolean
        editable: boolean
        republicTitle?: string
        republic: {
            code: string
            name: string
        }[]
        regionTitle?: string
        region: {
            code: string
            name: string
        }[]
        districtTitle?: string
        district: {
            code: string
            name: string
        }[]
        areaTitle?: string
        area: {
            code: string
            name: string
            param: string
        }[]
        streetTitle?: string
        street: {
            code: string
            name: string
        }[]
    }>({
        showEditAddress: false,
        editable: (p.user.access[p.user.unit] & Access.dispanser["Только просмотр (справочная система)"]) == 0,
        republic: [],
        region: [],
        district: [],
        area: [],
        street: []
    })
    const [form, setForm] = useState({
        id: p.patient.id,
        passportSeries: p.patient.passportSeries,
        passportNumber: p.patient.passportNumber,
        snils: p.patient.snils,
        works: p.patient.works,
        republic: p.patient.republic,
        region: p.patient.region,
        district: p.patient.district,
        area: p.patient.area,
        domicile: p.patient.domicile,
        street: p.patient.street,
        house: p.patient.house,
        build: p.patient.build,
        flat: p.patient.flat
    })

    const submitForm = () => {
        p.dispatch(updPassport({
            ...form,
            passportNumber: Number(form.passportNumber)
        }))
            .then(res => {
                if (res.success) {
                    notifySuccess("Данные обновлены")
                    p.dispatch(patientActions.getUchet({id: p.patient.id, cache: false}))
                } else {
                    notifyError(res.message)
                }
            })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleToggleEditAddress = () => {
        setState(s => ({
            ...s,
            showEditAddress: !s.showEditAddress
        }))
    }

    const handleFindChange = useCallback((e) => {
        setFind(f => ({
            ...f,
            [e.target.name]: e.target.value.toUpperCase()
        }))
    }, [])

    const handleFormChange = (e) => {
        setForm(f => ({
            ...f,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddressClick = useCallback((name) => (e) => {
        setForm(f => {
            let data = {
                ...f,
                [name]: Number(e.code || 0),
            }
            if (name == "area")
                data.domicile = Number(state.area.filter(v => v.code === e.code)?.[0]?.param || 0)
            return data
        })
        setState(s => ({
            ...s,
            [`${name}Title`]: e.name
        }))
    }, [form, state])

    const submitAddress = () => {
        p.dispatch(updAddress(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Адрес изменен")
                } else {
                    notifyError(res.message)
                }
            })
    }

    useEffect(() => {
        p.dispatch(findRepublic({name: find.republic}))
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        republic: res
                    }))
                }
            })

    }, [find.republic])

    useEffect(() => {
        p.dispatch(findRegion({name: find.region}))
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        region: res
                    }))
                }
            })

    }, [find.region])

    useEffect(() => {
        p.dispatch(findDistrict({name: find.district}))
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        district: res
                    }))
                }
            })

    }, [find.district])

    useEffect(() => {
        p.dispatch(findArea({name: find.area}))
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        area: res
                    }))
                }
            })

    }, [find.area])

    useEffect(() => {
        p.dispatch(findStreet({name: find.street}))
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        street: res
                    }))
                }
            })

    }, [find.street])

    return <div>
        <PageTitle title={dispanserSubModules.passport.title}/>
        <Panel className="d-flex flex-row flex-wrap mb-1 " childrenClass="d-flex flex-row align-items-end">
            <InputText
                name={"passportSeries"}
                value={form.passportSeries}
                title={"Серия"}
                isRow={false}
                style={{marginRight: 5}}
                onChange={handleChange}
                maxLength={8}
                readOnly={!state.editable}
            />
            <InputText
                name={"passportNumber"}
                type={"number"}
                value={form.passportNumber}
                title={"Номер паспорта"}
                isRow={false}
                style={{marginRight: 5}}
                onChange={handleChange}
                readOnly={!state.editable}
            />
            <InputText
                name={"snils"}
                value={form.snils}
                title={"Снилс"}
                isRow={false}
                style={{marginRight: 15}}
                onChange={handleChange}
                readOnly={!state.editable}
            />
            <GroupRadio
                className="flex-column"
                options={[{label: "Не работае", value: 0}, {label: "Работает", value: 1}]}
                name={"works"}
                onChange={e => setForm(s => ({...s, works: Number(e.target.value)}))}
                value={form.works}
                readOnly={!state.editable}
            />
            <div>
                {state.editable ? <Button
                    className="btn-outline-primary"
                    onClick={submitForm}
                >Обновить</Button> : null}
            </div>
        </Panel>
        <Panel>
            <div className="mb-4">
                {state.editable
                    ? <Button
                        className="btn-outline-primary"
                        style={{marginRight: 15}}
                        onClick={handleToggleEditAddress}
                    >{Icons.event.edit}</Button>
                    : null
                }
                Адрес прописки: {p.patient.address}
            </div>
            {state.showEditAddress && <div className="d-flex flex-row flex-wrap">
                <FindSide
                    style={{marginRight: 5}}
                    name={"republic"}
                    column={["Регион"]}
                    find={find}
                    state={state}
                    form={form}
                    onChange={handleFindChange}
                    onClick={handleAddressClick}
                />
                <FindSide
                    style={{marginRight: 5}}
                    name={"region"}
                    column={["Область"]}
                    find={find}
                    state={state}
                    form={form}
                    onChange={handleFindChange}
                    onClick={handleAddressClick}
                />
                <FindSide
                    style={{marginRight: 5}}
                    name={"district"}
                    column={["Район"]}
                    find={find}
                    state={state}
                    form={form}
                    onChange={handleFindChange}
                    onClick={handleAddressClick}
                />
                <FindSide
                    style={{marginRight: 5}}
                    name={"area"}
                    column={["Нас. пункт"]}
                    find={find}
                    state={state}
                    form={form}
                    onChange={handleFindChange}
                    onClick={handleAddressClick}
                />
                <FindSide
                    name={"street"}
                    column={["Улица"]}
                    find={find}
                    state={state}
                    form={form}
                    onChange={handleFindChange}
                    onClick={handleAddressClick}
                />
                <div className="d-flex flex-row w-100 justify-content-between align-items-center">
                    <Button className="btn-outline-danger" onClick={handleToggleEditAddress}>Отменить</Button>
                    <div className="d-flex flex-row flex-wrap">
                        <InputText
                            name={"house"} value={form.house} title={"Дом"} onChange={handleFormChange}
                            style={{marginRight: 10}} inputStyle={{maxWidth: 100}}
                        />
                        <InputText
                            name={"build"} value={form.build} title={"Корпус"} onChange={handleFormChange}
                            style={{marginRight: 10}} inputStyle={{maxWidth: 100}}
                        />
                        <InputText
                            name={"flat"} value={form.flat} title={"Квартира"} onChange={handleFormChange}
                            style={{marginRight: 10}} inputStyle={{maxWidth: 100}}
                        />
                    </div>
                    <Button className="btn-outline-primary" onClick={submitAddress}>Изменить</Button>
                </div>
            </div>}
        </Panel>
    </div>
}

export default connect((state: RootStore) => ({
    patient: state.patient,
    user: state.user
}))(Passport)
