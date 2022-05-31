import React from "react";
import DatePicker, {registerLocale} from "react-datepicker"
import ruLocale from "date-fns/locale/ru"

import "react-datepicker/dist/react-datepicker.css";
import {stringToDate} from "utility/date";
import {formatDateToInput} from "utility/string";

registerLocale("ru", ruLocale)


const InputDate = ({className, style, value, onChange, min, max}) => {

    return <DatePicker
        className={className}
        selected={stringToDate(value)}
        dateFormat={"dd.MM.yyyy"}
        onChange={(v, _) => onChange(formatDateToInput(v))}
        minDate={stringToDate(min)}
        locale="ru"
        maxDate={stringToDate(max)}
        customInput={<input style={style}/>}
    />
}

export default InputDate
