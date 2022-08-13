import React, {useEffect, useState} from "react";
import {AdministrationProps} from "./index";
import {PageTitleLvl2} from "components/Title";
import {formatDateToInput} from "utility/string";
import Select from "components/Input/select";
import {
    findLeadDoctor,
    findSection,
    findSectionDoctor,
    getDoctors,
    loadingAdd,
    loadingRemove
} from "store/actions/application";
import {loadComponent} from "consts/app";
import {newDoctorLeadSection, newDoctorLocation} from "store/actions/administration";
import {notifyError, notifySuccess} from "components/Notify";
import Table from "components/Table";
import GroupRadio from "components/Input/radio";
import Button from "components/Button";
import {units} from "consts/administration";
import {months} from "configs/app";


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

const LeadSection = (p: AdministrationProps & { title }) => {
    const [dataSection, setDataSection] = useState<SprUchN[]>([])
    const [dataDoctSection, setDataDoctSection] = useState<LocationDoctor[]>([])
    const [dataDoctors, setDataDoctors] = useState<Doctor[]>([])
    const [state, setState] = useState<{
        row: SectionDoctor | null
        loading: boolean
    }>({
        row: null,
        loading: false,
    })
    const [form, setForm] = useState<{
        date
        unit
        data?: SectionDoctor[]
        month: number
        year: number
    }>({
        date: formatDateToInput(new Date()),
        unit: p.user.unit,
        data: [],
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
    })

    const selectedDoctor = (name, id) => {
        const doct = dataDoctors.filter(v => v.id == id)?.[0]
        const doctorName = doct?.lname + " " + doct?.fname + " " + doct?.sname
        setForm(f => ({
            ...f,
            data: f.data.map(v => v.section != state.row.section ? v : {
                ...v,
                doctorId: Number(id || 0),
                doctorName: doctorName
            })
        }))
    }

    const dropDownDoctorItem = () => {

        return <Select
            options={[{label: "", value: ""}, ...dataDoctors.map(v => ({
                value: v.id,
                label: `${v.lname} ${v.fname} ${v.sname}`
            }))]}
            currentValue={state.row?.doctorId}
            onChange={selectedDoctor}
            name={"id"}
        />
    }

    const mapper = (currentRow: SectionDoctor) => (row: SectionDoctor) => {
        return <>
            <td>{row.section}</td>
            <td>{row.spec}</td>
            <td>
                {
                    (currentRow && currentRow.section === row.section)
                        ? dropDownDoctorItem()
                        : row.doctorName
                }
            </td>

        </>
    }

    const getData = async () => {
        p.dispatch(loadingAdd(loadComponent.administration.locationDoctor.doctor))
        await p.dispatch(findLeadDoctor({unit: form.unit, month: form.month, year: form.year, cache: false}))
            .then(async res => {
                if (Array.isArray(res)) {
                    await setDataDoctSection(res)
                }
            })
            .finally(() => {
                p.dispatch(loadingRemove(loadComponent.administration.locationDoctor.doctor))
            })
        await p.dispatch(findSection({unit: form.unit, cache: false}))
            .then(res => {
                if (Array.isArray(res)) {
                    setDataSection(res)
                }
            })
    }

    const onSubmit = () => {

        p.dispatch(newDoctorLeadSection(form))
            .then(res => {
                if (res.success) {
                    (async () => {
                        await getData()
                    })()
                    notifySuccess("Данные обновлены")
                } else {
                    notifyError(res.message)
                }
            })
    }

    useEffect(() => {
        (async () => {
            await getData()
        })()
        setState(s => ({
            ...s,
            row: null
        }))
        setForm(f => ({
            ...f,
            data: []
        }))
    }, [form.unit, form.year, form.month])

    useEffect(() => {
        (async () => {
            await p.dispatch(getDoctors({unit: form.unit, cache: false}))
                .then(res => {
                    if (Array.isArray(res))
                        setDataDoctors(res)
                })
        })()

        let d: SectionDoctor[] = []
        dataSection.map((v: SprUchN) => {
            let r = {
                section: v.section,
                spec: v.spec,
            } as SectionDoctor
            dataDoctSection.some((dd: LocationDoctor) => {
                if (dd.section === v.section) {
                    r.doctorId = dd.doctId
                    r.doctorName = `${dd.lname} ${dd.fname} ${dd.sname}`
                }
                return dd.section === v.section
            })
            d.push(r)
        })
        setForm(f => ({
            ...f,
            data: d
        }))
    }, [dataSection])

    return <div>
        <PageTitleLvl2 title={p.title}/>
        <div className={"d-flex flex-row justify-content-start"}>
            <div style={{marginRight: 15}}>
                <Table
                    // pagination={false}
                    style={{minWidth: 600}}
                    selecting={true}
                    pageSize={1000}
                    columns={["№", "Специализация", "Врач"]}
                    data={form.data}
                    mapper={mapper(state.row)}
                    onClick={r => setState(s => ({...s, row: r}))}
                    loading={Boolean(p.application.loadingList.indexOf(loadComponent.administration.locationDoctor.doctor) + 1)}
                />
            </div>
            <div>
                <div className="d-flex flex-row">
                    <div style={{marginRight: 5}}>
                        <Select
                            className="flex-column align-items-start justify-content-start"
                            options={months.map((v, i) => ({label: v, value: i}))}
                            currentValue={form.month - 1}
                            onChange={(_, v) => setForm(f => ({...f, month: Number(v) + 1}))}
                            name={"month"}
                            title={"Месяц"}
                        />
                    </div>
                    <div style={{marginRight: 5}}>
                        <Select
                            className="flex-column align-items-start justify-content-start"
                            options={Years}
                            currentValue={form.year}
                            onChange={(_, v) => setForm(f => ({...f, year: Number(v)}))}
                            name={"year"}
                            title={"Год"}
                        />
                    </div>
                </div>
                <GroupRadio
                    className="flex-column"
                    options={units}
                    name={"unit"}
                    onChange={v => setForm(f => ({...f, unit: Number(v.target.value)}))}
                    value={form.unit}
                />
                <Button
                    className="btn-outline-primary"
                    disabled={!form.data.length}
                    onClick={onSubmit}
                >Сохранить</Button>

            </div>
        </div>
    </div>
}

export default LeadSection
