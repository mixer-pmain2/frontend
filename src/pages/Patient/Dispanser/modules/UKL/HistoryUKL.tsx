import React, {useEffect, useState} from "react";
import {getUKL} from "../../../../../api/patient";
import Table from "../../../../../components/Table";
import {formatDate} from "../../../../../utility/string";


const mapper = (row: UKLData) => {
    const getColumns = (name) => {
        return Object.keys(row).filter(v => v.startsWith(name))
    }

    const getSum = name => {
        return getColumns(name).reduce((sum, a) => sum + row[a], 0)
    }

    const getUnit = () => {
        if (row.registratId != 0) return "Дисп."
        if (row.visitId != 0) return "Психотер./Суицид."
        return ""
    }

    return <>
        <td>{getSum("p1_")}</td>
        <td>{formatDate(row.date1)}</td>
        <td>{getSum("p2_")}</td>
        <td>{formatDate(row.date2)}</td>
        <td>{getSum("p3_")}</td>
        <td>{formatDate(row.date3)}</td>
        <td>{getUnit()}</td>
    </>
}


type HistoryUKLProps = {
    patient: PatientStore
    isType?: number
    onSelect?
}

const HistoryUKL = (p: HistoryUKLProps) => {
    const [data, setData] = useState<UKLData[]>([])

    useEffect(() => {
        getUKL({patientId: p.patient.id, isType: p.isType, cache: false})
            .then(res => {
                setData(res)
            })
    }, [])

    return <div>
        <Table
            columns={["УКЛ 1", "Дата 1", "УКЛ 2", "Дата 2", "УКЛ 3", "Дата 3", "Подр."]}
            data={data}
            mapper={mapper}
            selecting={true}
            onClick={p.onSelect}

        />
    </div>
}

export default HistoryUKL
