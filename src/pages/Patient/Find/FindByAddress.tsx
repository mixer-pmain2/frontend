import React, {memo, useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";

import {PageTitle} from "components/Title";
import Layout from "../../Layout";
import InputText from "components/Input/text";
import Icons from "components/Icons";
import Table from "components/Table";
import {findArea, findDistrict, findRegion, findRepublic, findStreet} from "store/actions/application";
import Button from "components/Button";
import Modal, {BTN_CLOSE, BTN_CUSTOM} from "components/Modal";
import {findByAddress, findById} from "store/actions/patient";
import {notifyError, notifyInfo} from "components/Notify";
import {formatDate} from "utility/string";
import * as patientActions from "../../../store/actions/patient";
import {linkDict} from "../../../routes";
import {useNavigate} from "react-router-dom";


const mapper = (row) => <>
    <td>
        <div>{Icons.event.arrowRightLine} {row.name}</div>
    </td>
</>

const mapperPatient = (row: PatientStore) => <>
    <td>{row.id}</td>
    <td>{row.lname}</td>
    <td>{row.fname}</td>
    <td>{row.sname}</td>
    <td>{formatDate(row.bday)}</td>
</>

const FindSideComponent = ({name, column, find, state, form, onChange, onClick, style = {}}) => {
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
            style={{maxWidth: 260}}
            columns={column}
            data={state?.[name]}
            selecting={form?.[name]}
            mapper={mapper}
            onClick={onClick(name)}
        />
    </div>
}

const FindSide = memo(FindSideComponent)

type FindByAddressProps = {
    dispatch?
}

const FindByAddress = (p: FindByAddressProps) => {
    const [foundPatient, setFoundPatient] = useState([])
    const [selectPatient, setSelectPatient] = useState(null)
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
        showListPatient: boolean,
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
        showListPatient: false,
        republic: [],
        region: [],
        district: [],
        area: [],
        street: []
    })
    const [form, setForm] = useState({
        republic: 2,
        region: null,
        district: null,
        area: null,
        domicile: null,
        street: null,
        house: "",
        build: "",
        flat: "",
    })

    const navigate = useNavigate()

    const handleFindChange = useCallback((e) => {
        setFind(f => ({
            ...f,
            [e.target.name]: e.target.value.toUpperCase()
        }))
    }, [])

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


    const handleFormChange = (e) => {
        setForm(f => ({
            ...f,
            [e.target.name]: e.target.value
        }))
    }

    const handleClickPatient = (row) => {
        setSelectPatient(row)
    }

    const findById = id => {
        p.dispatch(patientActions.findById({id}))
            .then(res => {
                if (res?.id) {
                    navigate(linkDict.patient.replace(/:id/g, id))
                } else {
                    notifyInfo("Нет данных")
                }
            })
    }

    const handleSelectPatient = (e) => {
        console.log(e)

        findById(selectPatient.id)
    }

    const handleSubmit = () => {
        let post = {}
        const keys = Object.keys(form)
        keys.map(v => {
            if (["house", "build"].indexOf(v) == -1 && form[v] && state[`${v}Title`]) {
                post[v] = form[v]
            } else if (form[v] && ["house", "build"].indexOf(v) > -1) {
                post[v] = form[v]
            }
        })

        p.dispatch(findByAddress(post))
            .then(res => {
                if (Array.isArray(res)) {
                    setFoundPatient(res)
                    setState(s => ({
                        ...s,
                        showListPatient: true
                    }))
                } else {
                    notifyError(res.message || "ERROR")
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
    console.log(form)
    return <Layout>
        <PageTitle title={"Поиск по адресу"}/>
        <div className="d-flex flex-row flex-wrap">
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
        </div>
        <div className="d-flex flex-row w-100 justify-content-between align-items-center">
            <div className="d-flex flex-row flex-wrap">
                <InputText
                    name={"house"} value={form.house} title={"Дом"} onChange={handleFormChange}
                    style={{marginRight: 10}} inputStyle={{maxWidth: 100}}
                />
                <InputText
                    name={"build"} value={form.build} title={"Корпус"} onChange={handleFormChange}
                    style={{marginRight: 10}} inputStyle={{maxWidth: 100}}
                />
            </div>
            <Button className="btn-outline-primary" onClick={handleSubmit}>Найти</Button>
        </div>
        <Modal
            title={"Поиск по адресу"}
            style={{minWidth: 1000, width: 1000}}
            onClose={_ => setState(s => ({...s, showListPatient: false}))}
            isOpen={state.showListPatient}
            body={<div>
                <label className="form-label">Найдено {foundPatient.length}</label>
                <Table
                    columns={["Шифр", "Фамилия", "Имя", "Отчество", "Дата рождения"]}
                    data={foundPatient}
                    mapper={mapperPatient}
                    onDoubleClick={handleSelectPatient}
                    onClick={handleClickPatient}
                    selecting={true}
                    updState={false}
                />
            </div>}
            customTitle={"Выбрать"}
            onCustom={handleSelectPatient}
            btnNum={BTN_CLOSE|BTN_CUSTOM}
        />
    </Layout>
}

export default connect((state: RootStore) => ({
    application: state.application
}))(FindByAddress)
