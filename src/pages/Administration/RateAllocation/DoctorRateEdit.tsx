import React, {memo, useEffect, useState} from "react";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import {Unit, UnitName} from "../../../consts/user";
import Modal, {BTN_CANCEL, BTN_SAVE, BTN_YES} from "../../../components/Modal";
import Select from "../../../components/Input/select";
import {deleteRate, getUnits, updRate} from "../../../store/actions/doctor";
import {AdministrationProps} from "../index";
import InputText from "../../../components/Input/text";
import {StateType} from "./index";
import {notifyError, notifySuccess} from "../../../components/Notify";
import {log} from "util";

const mapper = (row: DoctorRate) => <>
    <td>{UnitName[row.unit]}</td>
    <td>{row.rate}</td>
</>

type DoctorRateEditProps = {
    data: DoctorRate[]
    units: number
    mainState: StateType
    onUpdate
} & AdministrationProps

const DoctorRateEdit = (p: DoctorRateEditProps) => {
    const [dataUnits, setDataUnits] = useState<number[]>([])
    const [state, setState] = useState({
        showModalEdit: false,
        rowData: null as DoctorRate
    })
    const [form, setForm] = useState({
        unit: 0,
        rate: 0.0,
        doctorId: null,
        year: 0,
        month: 0
    })

    const closeModalEdit = () => {
        setState(s => ({
            ...s,
            showModalEdit: false
        }))
    }

    const onClickRow = (row: DoctorRate) => {
        setState(s => ({
            ...s,
            rowData: row
        }))
        setForm(f => ({
            ...f,
            unit: row.unit,
            rate: row.rate,
        }))
    }

    const onSave = () => {
        p.dispatch(updRate({
            ...form,
            rate: form.rate.toString()
        }))
            .then(res => {
                if (res.success) {
                    notifySuccess("Ставка обновлена")
                    p.onUpdate && p.onUpdate()
                    setState(s => ({...s, showModalEdit: false}))
                } else {
                    notifyError(res.message)
                }
            })
    }

    const removeRate = () => {
        p.dispatch(deleteRate(form))
            .then(res => {
                if (res.success) {
                    notifySuccess("Ставка удалена")
                    p.onUpdate && p.onUpdate()
                } else {
                    notifyError(res.message)
                }
            })
    }

    useEffect(() => {
        if (state.showModalEdit) {
            p.dispatch(getUnits({
                doctorId: p.mainState.rowDoctor?.id,
                unit: p.units
            }))
                .then(res => {
                    setDataUnits(res)
                })
        }

    }, [state.showModalEdit])

    useEffect(() => {
        if (dataUnits.length) {
            setForm(f => ({
                ...f,
                unit: state.rowData?.unit || dataUnits[0]
            }))
        }
    }, [dataUnits])

    useEffect(() => {
        setState(s => ({
            ...s,
            rowData: null,
        }))

        p.mainState.rowDoctor?.id && setForm(f => ({
            ...f,
            doctorId: p.mainState.rowDoctor.id,
            year: p.mainState.year,
            month: p.mainState.month + 1,
            rate: 0
        }))
    }, [p.mainState.rowDoctor])

    return <div>
        <Table
            columns={["Подразделение", "Ставка"]}
            data={p.data}
            mapper={mapper}
            selecting={true}
            style={{minHeight: 150}}
            onClick={onClickRow}
        />
        <div>
            <Button
                className="btn-outline-primary" style={{marginRight: 5}}
                onClick={_ => setState(s => ({...s, showModalEdit: !s.showModalEdit}))}
                disabled={!p.mainState.rowDoctor}
            >Изменить/Добавить</Button>
            <Button
                className="btn-outline-danger"
                disabled={!state.rowData}
                onClick={removeRate}
            >Удалить</Button>
        </div>
        <Modal
            title={"Изменить/Добавить ставку"}
            body={<div className="d-flex">
                <Select
                    options={dataUnits.map((v => ({
                        label: UnitName[v],
                        value: v
                    })))}
                    currentValue={form.unit}
                    onChange={(_, value) => setForm(f => ({...f, unit: Number(value)}))}
                />
                <InputText
                    value={form.rate}
                    type="number"
                    onChange={e => setForm(f => ({...f, rate: Number(e.target.value)}))}
                    step={0.1}
                />
            </div>}
            btnNum={BTN_SAVE + BTN_CANCEL}
            isOpen={state.showModalEdit}
            onClose={closeModalEdit}
            onCancel={closeModalEdit}
            onSave={onSave}
        />
    </div>
}

export default memo(DoctorRateEdit)
