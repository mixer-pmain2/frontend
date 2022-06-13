import React from "react";
import DatePicker, {registerLocale} from "react-datepicker"
import ruLocale from "date-fns/locale/ru"

import "react-datepicker/dist/react-datepicker.css";
import {stringToDate} from "utility/date";
import {formatDateToInput} from "utility/string";

registerLocale("ru", ruLocale)

type InputDateProps = {
    className?
    style?
    labelStyle?
    inputStyle?
    value: string
    onChange: (v: any) => any
    min?: string
    max?: string
    title?: string
    isRow?: boolean
    showYearDropdown?: boolean
    disabled?: boolean
}

const InputDate = (props: InputDateProps) => {
    const {className, style, value, onChange, min, max, title, isRow = true, showYearDropdown = false, disabled} = props

    return <div className={`d-flex ${isRow ? 'flex-row' : 'flex-column'} ${isRow ? "align-items-center" : "justify-items-center"}`} style={{...style}}>
        {title && <label className="form-label" style={{marginRight: 5, ...props.labelStyle}}>{title}</label>}
        <DatePicker
            className={`form-control ${className? className: ""}`}
            selected={disabled ? "" : (value ? stringToDate(value) : "")}
            dateFormat={"dd.MM.yyyy"}
            onChange={(v, _) => onChange(formatDateToInput(v))}
            showYearDropdown={showYearDropdown}
            scrollableYearDropdown
            minDate={min ? stringToDate(min) : ""}
            locale="ru"
            maxDate={max ? stringToDate(max) : ""}
            customInput={<input style={{...props.inputStyle}}/>}
            style={{}}
            disabled={disabled}
        />
    </div>
}

export default InputDate
