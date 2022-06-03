import React from "react";

import {formatDateToInput} from "utility/string";

import InputText from "components/Input/text";
import InputDate from "components/Input/date";
import GroupRadio from "components/Input/radio";
import Checkbox from "components/Input/checkbox";
import Button from "components/Button";


const FormNewPatient = ({form, setForm, onSubmit}) => {
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const setDate = (v) => {
        setForm({
            ...form,
            bday: v
        })
    }

    const setAnonim = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked
        })
    }

    const handleReset = () => {
        setForm({
            lname: "",
            fname: "",
            sname: "",
            bday: "",
            isAnonim: false,
            sex: ""
        })
    }

    return <div className="d-flex flex-row">
        <div className="w-50" style={{marginRight: 25}}>
            <div style={{marginBottom: 10}}>
                <InputText title="Фамилия" placeholder="Фамилия" value={form.lname} isRow={false}
                           onChange={handleChange}
                           name="lname"/>
            </div>
            <div style={{marginBottom: 10}}>
                <InputText title="Имя" placeholder="Имя" value={form.fname} isRow={false} onChange={handleChange}
                           name="fname"/>
            </div>
            <div style={{marginBottom: 10}}>
                <InputText title="Отчество" placeholder="Отчество" value={form.sname} isRow={false}
                           onChange={handleChange}
                           name="sname"/>
            </div>
            <div style={{width: 200, marginBottom: 10}}>
                <InputDate
                    title={"Дата рождения"}
                    max={formatDateToInput(new Date())}
                    isRow={false}
                    onChange={setDate}
                    showYearDropdown
                    value={form.bday}
                />
            </div>
            <div style={{width: 200}}>
                <GroupRadio name={"sex"} options={[{label: "М", value: "М"}, {label: "Ж", value: "Ж"}]}
                            onChange={handleChange} value={form.sex}/>
            </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
            <div>
                <Checkbox checked={form.isAnonim} title={"Анонимный"} name={"isAnonim"} id={"isAnonim"}
                          onChange={setAnonim}/>
            </div>
            <div className="d-flex flex-column" style={{width: 200}}>
                <Button className="btn-outline-danger" style={{marginBottom: 5}}
                        onClick={handleReset}>Сбросить</Button>
                <Button className="btn-outline-primary" onClick={onSubmit}>Записать</Button>
            </div>
        </div>
    </div>
}

export default FormNewPatient
