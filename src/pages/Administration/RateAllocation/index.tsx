import React, {useEffect, useState} from "react";
import {AdministrationProps} from "../index";
import {PageTitleLvl2} from "components/Title";
import Select from "components/Input/select";
import {months} from "configs/app";
import Checkbox from "components/Input/checkbox";
import Table from "components/Table";
import {getDoctors} from "store/actions/application";
import DoctorRateEdit from "./DoctorRateEdit";
import {getRate, getVisitCountPlan} from "../../../store/actions/doctor";
import VisitCountPlan from "./VisitCountPlan";


const Units = [
    {
        label: "Взрослый диспансер",
        value: 0,
        unit: [1, 8, 1024, 2048],
    },
    {
        label: "Детский диспансер",
        value: 1,
        unit: [33554432, 16777216, 16]
    },
    {
        label: "Психотерапия",
        value: 2,
        unit: [2]
    },
    {
        label: "Суицидология",
        value: 3,
        unit: [4]
    },
    {
        label: "АПЛ",
        value: 4,
        unit: [2048]
    },
]

const mapperDoctors = (row: Doctor) => <>
    <td>{row.lname} {row.fname} {row.sname}</td>
</>

const Years = [
    {
        label: 2018,
        value: 2018
    },
    {
        label: (new Date()).getFullYear() - 1,
        value: (new Date()).getFullYear() - 1
    },
    {
        label: (new Date()).getFullYear(),
        value: (new Date()).getFullYear()
    },
]

export type StateType = {
    unitValue: number
    month: number
    year: number
    z152: boolean
    rowDoctor: null | Doctor,
    sumRate: number
}

const RateAllocation = (p: AdministrationProps & { title }) => {
    const [dataDoctors, setDataDoctors] = useState<Doctor[]>([])
    const [dataDoctorRate, setDataDoctorRate] = useState<DoctorRate[]>([])
    const [dataDoctorCountVisit, setDataDoctorCountVisit] = useState([])
    const [state, setState] = useState<StateType>({
        unitValue: Units[0].value,
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
        z152: true,
        rowDoctor: null as Doctor,
        sumRate: 0,
    })

    const onChangeSelect = (name: string, value: string) => {
        setState(s => ({
            ...s,
            [name]: ["year", "month", "unitValue"].indexOf(name) + 1 ? Number(value) : value
        }))
    }

    const onUpdate = () => {
        updateData()
    }

    const updateData = () => {
        if (state.rowDoctor) {
            (async () => {
                await p.dispatch(getRate({
                    doctorId: state.rowDoctor.id,
                    month: state.month + 1,
                    year: state.year,
                    unit: Units[state.unitValue].unit.reduce((sum, a) => sum + a, 0),
                    cache: false
                }))
                    .then(res => {
                        setDataDoctorRate(res)
                    })
                await p.dispatch(getVisitCountPlan({
                    doctorId: state.rowDoctor.id,
                    month: state.month + 1,
                    year: state.year,
                    cache: false,
                }))
                    .then(res => {
                        setDataDoctorCountVisit(res)
                    })
            })()
        }
    }

    useEffect(() => {
        console.log(state)
        updateData()
    }, [state.rowDoctor, state.month, state.year])

    useEffect(() => {
        (async () => {
            let data: Doctor[] = []
            for (const unit of Units[state.unitValue].unit) {
                await p.dispatch(getDoctors({unit: unit}))
                    .then(res => {
                        data.push(...res)
                    })
            }
            data = data.sort((a, b) => a.lname?.[0].localeCompare(b.lname?.[0]))
                .filter((v, index, self) => {
                    let idRow = 0
                    self.map((d, i) => {
                        if (d.id === v.id)
                            idRow = i
                    })
                    return index === idRow
                })
            setDataDoctors(data)
        })()

        setState(s => ({
            ...s,
            rowDoctor: null
        }))

    }, [state.unitValue])


    return <div>
        <PageTitleLvl2 title={p.title}/>
        <div className="d-flex flex-row">
            <div style={{marginRight: 5}}>
                <Select
                    className="flex-column align-items-start justify-content-start"
                    options={Units}
                    currentValue={state.unitValue}
                    onChange={onChangeSelect} name={"unitValue"}
                    title={"Подразделение"}
                />
            </div>
            <div style={{marginRight: 5}}>
                <Select
                    className="flex-column align-items-start justify-content-start"
                    options={months.map((v, i) => ({label: v, value: i}))}
                    currentValue={state.month}
                    onChange={onChangeSelect} name={"month"}
                    title={"Месяц"}
                />
            </div>
            <div style={{marginRight: 5}}>
                <Select
                    className="flex-column align-items-start justify-content-start"
                    options={Years}
                    currentValue={state.year}
                    onChange={onChangeSelect} name={"year"}
                    title={"Год"}
                />
            </div>
        </div>
        <hr/>
        <div className="d-flex flex-row">
            <div className="flex-grow-0" style={{marginRight: 15}}>
                <Checkbox
                    name={"z152"} checked={state.z152} title={"Доступ"}
                    onChange={e => setState(s => ({
                        ...s,
                        [e.target.name]: e.target.checked
                    }))}
                />
                <Table
                    data={dataDoctors}
                    mapper={mapperDoctors}
                    selecting={true}
                    onClick={v => setState(s => ({...s, rowDoctor: v}))}
                />
            </div>
            <div className="flex-grow-1">
                <div className="fs-5">{state.rowDoctor?.lname} {state.rowDoctor?.fname} {state.rowDoctor?.sname}</div>
                <div>{state.rowDoctor && dataDoctorRate && "Ставок: " + dataDoctorRate.reduce((sum, a) => sum + a.rate, 0)}</div>
                <DoctorRateEdit
                    data={dataDoctorRate}
                    units={Units[state.unitValue].unit.reduce((sum, a) => sum + a, 0)} {...p}
                    mainState={state}
                    onUpdate={onUpdate}
                />
                <VisitCountPlan data={dataDoctorCountVisit}/>
            </div>
        </div>
    </div>
}

export default RateAllocation
