import React, {useEffect, } from "react";

import Table from "components/Table";

const mapper = (row) => <>
    <td>{row}</td>
</>

type TableAnomalyProps = {
    onSelect?: (v: any) => any
    data: {[name: number]: string}[]
}


const TableAnomaly = (props: TableAnomalyProps) => {
    const {onSelect} = props

    const handleClick = (e) => {
        const index = Object.values(props.data).indexOf(e)
        const key = Object.keys(props.data)[index]
        onSelect && onSelect(key)
    }

    useEffect(() => {
    }, [])

    return <Table
        columns={["Основные нарушения"]}
        data={Object.values(props.data || [])}
        loading={false}
        selecting={true}
        mapper={mapper}
        pageSize={100}
        onClick={handleClick}
    />
}

export default TableAnomaly
