import React from "react";


const SelectSection = ({sections, section, onChange}) => {
    return <div>
        <div className="d-flex flex-row align-items-center">
            <label htmlFor="section" style={{marginRight: 5}}>Выберите № участока</label>
            <select className="form-select" style={{width: 100}} name="section" id="section" value={section} onChange={onChange}>
                {sections.map((v, i) => <option key={i} value={v}>{v}</option>)}
            </select>
        </div>

    </div>
}

export default SelectSection;
