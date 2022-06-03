import React from "react";

const InputText = ({type = "text", name, title, id, value, placeholder, onChange, isRow=true}) => {

    return <div className={`d-flex ${isRow ? 'flex-row' :'flex-column'} align-items-start`}>
        <label htmlFor="input" className="form-label" style={{marginRight: 5}}>{title}</label>
        <input
            type={type}
            className="form-control"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        >
        </input>
    </div>
}

export default InputText
