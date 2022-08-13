import React from "react";

import Select from "components/Input/select";

type UKLItemProps = {
    onChange?
    key?
    value: number
    item: uklType
}

const UKLItem = (p: UKLItemProps) => {

    return <div className="d-flex flex-row justify-content-between">
        <label htmlFor={`item_${p.key}`}>{p.item.label}</label>
        <div style={{width: 70}}>
            <Select
                options={p.item.evaluations.map(v => ({label: v, value: v}))}
                currentValue={p.value}
                onChange={p.onChange}
            />
        </div>
    </div>
}

export default UKLItem
