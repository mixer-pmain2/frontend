import React, {CSSProperties, memo, useEffect, useState} from "react"
import Pagination from "../Pagination";
import Loading from "../Loading";

type TableProps = {
    columns?: string[]
    data: any[]
    mapper: (row: Object) => any
    onDoubleClick?
    selecting?
    onClick?
    loading?: boolean
    style?
    pageSize?: number
    onCancelSelect?: (call: () => void) => void
    pagination?: boolean
    height?: string
}

const Table = (props: TableProps) => {
    const PAGE_SIZE = props.pageSize || 10
    const {columns, data, mapper, onDoubleClick, selecting, onClick, loading, style, pagination = true} = props
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedRow, setSelectedRow] = useState(null)
    const selectedStyle = selecting ? {backgroundColor: "gray", color: "white"} : {}

    let total = Math.floor(data.length / PAGE_SIZE)
    if (data.length % PAGE_SIZE > 0) total += 1

    const cancelSelect = () => {
        setSelectedRow(null)
    }

    const handleNextPage = () => {
        if (currentPage >= total) return
        setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        if (currentPage <= 0) return
        setCurrentPage(currentPage - 1)
    }

    const handleDoubleClick = (e) => {
        onDoubleClick && onDoubleClick(e)
    }

    const onPage = (num) =>
        setCurrentPage(num)

    const showDataOnlyForPage = (i) => currentPage * PAGE_SIZE <= i && (currentPage * PAGE_SIZE + PAGE_SIZE) > i

    const handleClick = (i) => {
        setSelectedRow(i)
        onClick && onClick(data[i])
    }

    props.onCancelSelect && props.onCancelSelect(cancelSelect)
    useEffect(() => {
        setCurrentPage(0)
        setSelectedRow(null)
    }, [data])

    const headerStyle: CSSProperties = !pagination ? {
        display: "block",

    } : {}
    const bodyStyle: CSSProperties = !pagination ? {
        overflowY: "auto",
        height: `${props.height}`,
        display: "block"
    } : {}

    return <div style={{...style}} >
        <table className="table table-striped table-hover w-100">
            {
                columns && <thead style={headerStyle}>
                <tr>
                    {columns.map((v, i) => <th scope="col" key={i}>{v}</th>)}
                </tr>
                </thead>
            }
            <tbody style={{...bodyStyle}}>
            {
                loading ? <tr>
                    <td colSpan={columns?.length || 1}>
                        <div className="d-flex justify-content-center">
                            <Loading isLoading={true}/>
                        </div>
                    </td>
                </tr> : <>
                    {data?.map((row, i) => showDataOnlyForPage(i) &&
                        <tr key={i}
                            onDoubleClick={_ => handleDoubleClick(row)}
                            onClick={_ => handleClick(i)}
                            style={selectedRow === i ? selectedStyle : {}}
                        >
                            {mapper(row)}
                        </tr>)}
                    {data.length === 0 && <tr>
                        <td colSpan={columns?.length || 1}>
                            <div className="d-flex justify-content-center">Нет данных</div>
                        </td>
                    </tr>}</>
            }
            </tbody>

        </table>
        <div className="d-flex justify-content-end">
            {total > 1 && <Pagination
                total={total}
                current={currentPage}
                nextPage={handleNextPage}
                prevPage={handlePrevPage}
                onPage={onPage}
            />}
        </div>
    </div>
}

export default memo(Table)
