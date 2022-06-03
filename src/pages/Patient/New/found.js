import React, {useState} from "react";

import Table from "components/Table";
import {PageTitleLvl2} from "components/Title";
import Button from "components/Button";
import {linkDict} from "../../../routes";
import {useNavigate} from "react-router-dom";
import {getAddress} from "store/actions/patient";
import {useDispatch} from "react-redux";


const FoundTable = ({data, goBack, mapper, onCreate}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [row, setRow] = useState(null)
    const [address, setAddress] = useState("")

    const getRow = async (e) => {
        setRow(e)
        const data = await dispatch(getAddress({patientId: e.id}))
        setAddress(data?.address)
    }

    const onSelect = () => {
        navigate(linkDict.patient.replace(/:id/g, row.id))
    }

    return <div>
        <PageTitleLvl2 title={"Найдены совпадения"}/>
        <div>Адрес: {address}</div>
        <Table
            mapper={mapper}
            columns={["Шифр", "Фамилия", "Имя", "Отчество", "Дата рождения"]}
            data={data}
            onClick={getRow}
            onDoubleClick={onSelect}
            selecting={true}
        />
        <div className="d-flex flex-row justify-content-between">
            <Button className="btn-outline-primary" onClick={onCreate}>Создать нового</Button>
            <div>
                <Button style={{marginRight: 5}} className="btn-outline-primary" onClick={goBack}>Назад</Button>
                <Button className="btn-primary" onClick={onSelect} disabled={!row?.id}>Выбрать</Button>
            </div>
        </div>
    </div>
}

export default FoundTable
