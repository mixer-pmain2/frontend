import React, {useEffect, useState} from "react";
import {formatDate} from "utility/string";
import {getViewed} from "api/patient";
import Table from "components/Table";
import NewViewed from "./NewViewed";

const mapper = (row: ViewedData) => <>
    <td>{formatDate(row.viewDate)}</td>
    <td>{row.doctorName1}</td>
    <td>{row.doctorName2}</td>
    <td>{row.conclusion}</td>
    <td>{row.actNumber}</td>
    <td>{formatDate(row.actDate)}</td>
    <td>{row.view}</td>
    <td>{formatDate(row.courtDate)}</td>
    <td>{formatDate(row.courtConclusionDate)}</td>
    <td>{formatDate(row.dateEnd)}</td>
    <td>{row.courtName}</td>
</>

type ViewedProps = {
    patient: PatientStore
    number: number
}

const Viewed = (p: ViewedProps) => {
    const [state, setState] = useState<{
        viewedData: ViewedData[]
        selectedRow: ViewedData
        showNewViewed: boolean
    }>({
        viewedData: [],
        selectedRow: null,
        showNewViewed: false
    })

    const handleSelect = (row: ViewedData) => {
        setState(s => ({
            ...s,
            selectedRow: {...row, number: p.number},
            showNewViewed: true
        }))
    }

    const loadViewed = () => {
        getViewed({patientId: p.patient.id, number: p.number, cache: false})
            .then(res => {
                if (Array.isArray(res))
                    setState(s => ({
                        ...s,
                        viewedData: res
                    }))
            })
    }

    useEffect(() => {
        loadViewed()
    }, [p.number])

    return <div>
        <Table
            columns={["Дата осм.", "Врач", "Врач", "Осмотр", "№ акта", "Дата акта", "Реш. суда", "Дата опр.", "Дата пол.", "Окончание", "Суд"]}
            data={state.viewedData}
            mapper={mapper}
            selecting={true}
            onDoubleClick={handleSelect}
        />
        <NewViewed
            show={state.showNewViewed}
            onClose={() => setState(s => ({...s, showNewViewed: false}))}
            viewedRow={state.selectedRow}
            onUpdate={loadViewed}
        />

    </div>
}

export default Viewed
