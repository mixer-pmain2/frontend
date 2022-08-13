import React, {useEffect, useState} from "react";
import {AdministrationProps} from "./index";
import {PageTitleLvl2} from "components/Title";
import InputDate from "components/Input/date";
import {formatDateToInput} from "utility/string";
import Table from "components/Table";
import {Unit, UnitName} from "consts/user";
import GroupRadio from "components/Input/radio";
import {unit} from "configs/access";
import {findSection, findSectionDoctor, getDoctors, loadingAdd, loadingRemove} from "store/actions/application";

import "styles/pages/Administration/locationDoctor.css"
import Select from "components/Input/select";
import Button from "../../components/Button";
import {notifyError, notifySuccess} from "../../components/Notify";
import {newDoctorLocation} from "../../store/actions/administration";
import {loadComponent} from "../../consts/app";
import {units} from "../../consts/administration";



let LocationDoctor = (p: AdministrationProps & { title }) => {
    const [dataSection, setDataSection] = useState<SprUchN[]>([])
    const [dataDoctSection, setDataDoctSection] = useState<LocationDoctor[]>([])
    const [dataDoctors, setDataDoctors] = useState<Doctor[]>([])
    const [state, setState] = useState<{
        row: SectionDoctor | null
        loading: boolean
    }>({
        row: null,
        loading: false
    })
    const [form, setForm] = useState<{
        date
        unit
        data?: SectionDoctor[]
    }>({
        date: formatDateToInput(new Date()),
        unit: p.user.unit,
        data: []
    })

    const selectedDoctor = (name, id) => {
        const doct = dataDoctors.filter(v => v.id == id)?.[0]
        const doctorName = doct?.lname+" "+doct?.fname+" "+doct?.sname
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
        await p.dispatch(findSectionDoctor({unit: form.unit, cache: false}))
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

        p.dispatch(newDoctorLocation(form))
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
    }, [form.unit])

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
                    columns={["№", "Специализация", "Врач"]} data={form.data} mapper={mapper(state.row)}
                    onClick={r => setState(s => ({...s, row: r}))}
                    loading={Boolean(p.application.loadingList.indexOf(loadComponent.administration.locationDoctor.doctor) + 1)}
                />
            </div>
            <div>
                <InputDate
                    value={form.date} onChange={v => setForm(f => ({...f, date: v}))}
                    style={{marginBottom: 10}}
                />
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

export default LocationDoctor
