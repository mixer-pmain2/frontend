import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {downloadReport, getJobs} from "../../api/report";
import Table from "../../components/Table";
import {CategoryType, Filters, Reports} from "../../configs/report";
import {formatDate, formatDateTime} from "../../utility/string";
import Icons from "../../components/Icons";
import {notifyError, notifySuccess} from "../../components/Notify";
import Tooltip, {TooltipTypes} from "components/Tooltip";
import {styles} from "styles"
import {isNotEmpty} from "../../utility/app";


type JobsProps = {
    dispatch
    user: UserStore
}


const Jobs = (p: JobsProps) => {
    const [reportJobs, setReportJobs] = useState<ReportJob[]>([])
    const [reportType, setReportType] = useState<{ [name: string]: Report }>({})
    let idInterval = null

    const onDownload = (id: number, code: string) => {
        downloadReport({id, filename: `${code}-${id}`})
            .catch(err => notifyError(err.message()))
    }

    const filterValueFormat = (value) => {
        if (CategoryType[value]) {
            return CategoryType[value]
        }
        return value
    }

    const mapper = (row: ReportJob) => {
        const filters = Object.keys(row.filters).filter(v => ["dateStart", "dateEnd", "rangeDate"].indexOf(v) === -1)
            .map((v, i) => {
            if (isNotEmpty(row.filters[v])) {
                const value = Array.isArray(row.filters[v]) ? row.filters[v].filter(v => isNotEmpty(v)).join("-") : row.filters[v]
                if (isNotEmpty(value))
                    return `${Filters[v].title}: ${filterValueFormat(value)}`
            }
        })

        return <>
            <td>{formatDateTime(row.date)}</td>
            <td>{reportType[row.code]?.title}</td>
            <td className="">
                <div className="d-flex flex-row align-items-center">
                    {row.filters.dateStart && <div
                        style={{marginRight: 15}}>{Filters.dateStart.title}: {formatDate(row.filters.dateStart)}</div>}
                    {row.filters.dateEnd &&
                    <div style={{marginRight: 15}}>{Filters.dateEnd.title}: {formatDate(row.filters.dateEnd)}</div>}
                    {row.filters.rangeDate?.length && <div style={{marginRight: 15}}>
                        {Filters.rangeDate.title}: {row.filters.rangeDate.filter(v => v != "")?.map(v => formatDate(v)).join(" - ")}
                    </div>}
                    {Object.keys(row.filters).filter(v => ["dateStart", "dateEnd", "rangeDate"].indexOf(v) === -1)
                        .filter(v => {
                            return (isNotEmpty(row.filters[v]))
                        }).length ?
                        <a href="#"
                           data-tip
                           data-for={`filters${row.id}`}
                           className="d-flex align-items-center"
                           style={{color: styles.primary.borderColor, fontSize: 26}}>
                            {Icons.event.information}
                        </a>
                        : null}
                </div>
            </td>
            <td style={{padding: 0}}>
                <div style={{fontSize: 26}}>
                    {
                        row.status == "DONE"
                            ? <a href="#"
                                 data-tip="Скачать" data-for={`bnt${row.id}`}
                                 onClick={() => onDownload(row.id, row.code)}
                                 style={{color: "green"}}>
                                {Icons.status[row.status]}
                            </a>
                            : (row.status === "ERROR"
                                ? <a href="#"
                                     data-tip="Ошибка получения отчета" data-for={`bnt${row.id}`}
                                     style={{color: styles.danger.borderColor}}>{Icons.status[row.status]}</a>
                                : Icons.status[row.status]
                            )
                    }
                </div>
                <Tooltip
                    body={filters.map((v, i) => <div key={i}>{v}</div>)}
                    type={TooltipTypes.primary}
                    id={`filters${row.id}`}
                />
                <Tooltip
                    type={TooltipTypes.primary}
                    id={`bnt${row.id}`}
                />
            </td>
        </>
    }

    const updJobsState = async (j: ReportJob[], newRj: ReportJob[]) => {
        j.forEach(oldReport => {
            newRj.forEach(newReport => {
                if (oldReport.id === newReport.id && oldReport.status === "NEW" && oldReport.status !== newReport.status) {
                    if (newReport.status === "DONE")
                        notifySuccess(`Отчет "${reportType[oldReport.code].title}" готов`)
                    if (newReport.status === "ERROR")
                        notifyError(`Ошибка получения отчета ${reportType[oldReport.code].title} `)
                }
            })
        })
        if (!newRj.filter(v => (["NEW", "PROGRESS"].indexOf(v.status) + 1)).length) {
            clearInterval(idInterval)
        }
    }

    const isNotEqualReportList = (oldR: ReportJob[], newR: ReportJob[]) => {
        let res = false
        oldR.some(o => {
            newR.some(n => {
                if (o.id === n.id && o.status !== n.status) {
                    res = true
                    return
                }
            })
        })
        return res
    }

    const updReportList = (j: ReportJob[] = reportJobs) =>
        getJobs({userId: p.user.id})
            .then(res => {
                if (res.length !== reportJobs.length || isNotEqualReportList(res, reportJobs)) {
                    setReportJobs(res)
                }
                updJobsState(j, res)
            })

    useEffect(() => {
        idInterval = setInterval(async () => {
            await updReportList()
        }, 3000)

        return () => idInterval && clearInterval(idInterval)
    }, [reportJobs])

    useEffect(() => {
        (async () => {
            Reports.map(v => setReportType(r => ({...r, [v.code]: v})))
            //
            await updReportList()
        })()
    }, [])


    return <div>
        <Table
            columns={["Дата", "Название", "Фильтр", "Статус"]}
            mapper={mapper}
            data={reportJobs}
        />
    </div>
}

export default connect((status: RootStore) => ({
    user: status.user
}))(Jobs)
