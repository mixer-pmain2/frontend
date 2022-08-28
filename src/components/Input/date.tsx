import React from "react";
import DatePicker, {registerLocale} from "react-datepicker"
import MaskedTextInput from "react-text-mask";

import ruLocale from "date-fns/locale/ru"

import "react-datepicker/dist/react-datepicker.css";

import {stringToDate} from "utility/date";
import {formatDateToInput} from "utility/string";
import Button from "../Button";
import Icons from "../Icons";

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
    cleaner?:boolean
    onClean?
}

const InputDate = (props: InputDateProps) => {
    const {className, style, value, onChange, min, max, title, isRow = true, showYearDropdown = false, disabled} = props
    const handleClean = () => {
        onChange("")
    }
    return <div
        className={`d-flex ${isRow ? 'flex-row' : 'flex-column'} ${isRow ? "align-items-center" : "justify-items-center"}`}
        style={{...style}}>
        {title && <label className="form-label" style={{marginRight: 5, ...props.labelStyle}}>{title}</label>}
        <div className="d-flex flex-row">
            <DatePicker
                className={`form-control ${className ? className : ""}`}
                selected={disabled ? "" : (value ? stringToDate(value) : "")}
                dateFormat={"dd.MM.yyyy"}
                onChange={(v, _) => onChange(formatDateToInput(v))}
                showYearDropdown={showYearDropdown}
                scrollableYearDropdown
                minDate={min ? stringToDate(min) : ""}
                locale="ru"
                maxDate={max ? stringToDate(max) : ""}
                // customInput={<input style={{...props.inputStyle}}/>}
                customInput={<MaskedTextInput type={"text"}
                                              mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}/>}
                style={{}}
                disabled={disabled}
            />
            {props.cleaner && <Button className="btn-light" onClick={handleClean}>{Icons.event.clean}</Button>}
        </div>
    </div>
}

export default InputDate
