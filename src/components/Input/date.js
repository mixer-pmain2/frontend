import React from "react";
import DatePicker, {registerLocale} from "react-datepicker"
import ruLocale from "date-fns/locale/ru"

import "react-datepicker/dist/react-datepicker.css";
import {stringToDate} from "utility/date";
import {formatDateToInput} from "utility/string";

registerLocale("ru", ruLocale)


const InputDate = ({className, style, value, onChange, min, max, title, isRow=true, showYearDropdown=false}) => {

    return <div className={`d-flex ${isRow ? 'flex-row' :'flex-column'} align-items-start`}>
        {title && <label className="form-label">{title}</label>}
        <DatePicker
            className={`form-control ${className}`}
            selected={value ? stringToDate(value) : ""}
            dateFormat={"dd.MM.yyyy"}
            onChange={(v, _) => onChange(formatDateToInput(v))}
            showYearDropdown={showYearDropdown}
            scrollableYearDropdown
            minDate={min ? stringToDate(min) : ""}
            locale="ru"
            maxDate={max ? stringToDate(max) : ""}
            customInput={<input style={style}/>}
        />
    </div>
}

export default InputDate
