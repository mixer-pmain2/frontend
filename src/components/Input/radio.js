import React from "react";

export const RadioItem = ({name, title, value, id, checked, onChange}) => {
    return <div className="form-check" style={{marginRight: 15}}>
        <label htmlFor={id}>{title}</label>
        <input className="form-check-input" type="radio" name={name} id={id} value={value} checked={checked}
               onChange={onChange}/>
    </div>
}

const GroupRadio = ({options, name, onChange, value}) => {

    return <div className="d-flex flex-row">
        {options?.map((v, i) => <RadioItem
            key={i}
            title={v.label}
            value={v.value}
            checked={v.value === value}
            name={name}
            id={`${name}_${i}`}
            onChange={onChange}/>)}
    </div>
}

export default GroupRadio
