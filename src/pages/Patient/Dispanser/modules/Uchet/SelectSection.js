import React from "react";
import {connect} from 'react-redux'

import InputText from 'components/Input/text.tsx'
import User from 'classes/User.ts'


const SelectSection = ({sections, section, onChange, user}) => {
    const u = new User(user)

    const handleOnChange = (e) => {
        onChange(e.target.value)
    }

    return <div>
        <div className="d-flex flex-row align-items-center">
            <label htmlFor="section" style={{marginRight: 5}}>Выберите № участока</label>
            {
                !u.isAdmin()
                    ? <select className="form-select" style={{width: 100}} name="section" id="section" value={section} onChange={handleOnChange}>
                        {sections.map((v, i) => <option key={i} value={v}>{v}</option>)}
                    </select>
                    : <InputText
                        type={"number"}
                        value={section}
                        onChange={handleOnChange}
                    />
            }
        </div>
    </div>
}

export default connect((state: RootStore) => ({
    user: state.user
}))(SelectSection)
