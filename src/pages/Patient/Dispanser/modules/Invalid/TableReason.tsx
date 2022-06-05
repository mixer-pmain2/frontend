import React, {useEffect} from "react";

import Table from "components/Table";

const mapper = (row) => <>
    <td>{row}</td>
</>


type TableReasonProps = {
    onSelect?: (v: any) => any
    data: {[name: number]: string}[]
    onCancelSelect?: (call: () => void) => void
}

const TableReason = (props: TableReasonProps) => {
    const {onSelect} = props

    const handleClick = (e) => {
        const index = Object.values(props.data).indexOf(e)
        const key = Object.keys(props.data)[index]
        onSelect && onSelect(key)
    }

    useEffect(() => {
    }, [])

    return <Table
        columns={["Причина инвалидности"]}
        data={Object.values(props.data || [])}
        loading={false}
        selecting={true}
        onCancelSelect={props.onCancelSelect}
        mapper={mapper}
        pageSize={100}
        onClick={handleClick}
    />
}

export default TableReason
