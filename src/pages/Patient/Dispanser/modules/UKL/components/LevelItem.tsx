import React, {useEffect, useState} from "react";
import GroupRadio from "components/Input/radio";
import {Access} from "../../../../../../consts/user";
import {notifyError} from "../../../../../../components/Notify";

type LevelItemProps = {
    access: number
    onChange?
    defaultValue?: number
}

const LevelItem = (p: LevelItemProps) => {
    const handleOnChange = (e) => {
        const value = e.target.value
        if (value == 2 && (p.access & Access.dispanser["Ввод УКЛ 2 уровня"]) == 0) {
            notifyError("У Вас не хватает прав для контроля 2-го уровня.")
            return
        }
        if (value == 3 && (p.access & Access.dispanser["Ввод УКЛ 3 уровня"]) == 0) {
            notifyError("У Вас не хватает прав для контроля 3-го уровня.")
            return
        }
        p.onChange(Number(value))
    }

    const getOptions = () => {
        let options = [
            {label: "1", value: 1},
            {label: "2", value: 2},
            {label: "3", value: 3},
        ]
        return options
    }


    return <div className="d-flex">
        <div>
            <h6>Уровень</h6>
            <GroupRadio
                options={getOptions()}
                onChange={handleOnChange} name={"level"} value={p.defaultValue}
            />
        </div>
    </div>
}

export default LevelItem
