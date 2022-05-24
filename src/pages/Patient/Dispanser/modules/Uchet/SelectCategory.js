import React from "react";


const SelectCategory = ({categories, onChange}) => {

    const handleOnChange = (e) => {
        onChange(e.target.value)
    }

    return <div>
        <h6>Новая группа учета</h6>
        {categories.map((v, i) => <div key={i}>
                <input className="form-check-input" type="radio" id={`category_${i}`} name={"categories"} value={v}
                       onClick={handleOnChange}/>
                <label className="form-label" htmlFor={`category_${i}`} style={{marginLeft: 5}}>{v}</label>
            </div>
        )}

    </div>
}

export default SelectCategory;
