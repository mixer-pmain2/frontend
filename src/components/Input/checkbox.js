import React from "react";

const Checkbox = ({id, name, checked, title, onChange}) => {

    return <div className="form-check">
        <label className="form-check-label" htmlFor={id}>{title}</label>
        <input className="form-check-input" type="checkbox" id={id} name={name} checked={checked} onChange={onChange}/>
    </div>
}

export default Checkbox
