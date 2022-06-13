import React from "react";

type InputTextProps = {
    type?
    name?
    title?
    id?
    value
    placeholder?
    onChange?
    isRow?: boolean
    style?
    maxLength?: number
    readOnly?: boolean
    inputStyle?
}

const InputText = (p: InputTextProps) => {
    const {
        type = "text",
        name,
        title,
        id,
        value,
        placeholder,
        onChange,
        isRow = true,
        style = {},
        maxLength,
        readOnly = false,
        inputStyle = {}
    } = p

    return <div className={`d-flex ${isRow ? 'flex-row' : 'flex-column'} ${isRow ? "align-items-center" : "justify-items-center"}`} style={style}>
        <label htmlFor="input" className="form-label" style={{marginRight: 5}}>{title}</label>
        <input
            type={type}
            className="form-control"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            maxLength={maxLength}
            readOnly={readOnly}
            style={inputStyle}
        >
        </input>
    </div>
}

export default InputText
