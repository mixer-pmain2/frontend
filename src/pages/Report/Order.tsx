import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Select from "../../components/Input/select";
import {Filters, Reports} from "../../configs/report";
import InputDate from "../../components/Input/date";
import {formatDateToInput} from "../../utility/string";
import GroupRadio from "../../components/Input/radio";
import Button from "../../components/Button";
import {createJob} from "../../api/report";
import {notifyError, notifySuccess} from "../../components/Notify";
import InputText from "../../components/Input/text";
import {isEmptyField} from "../../utility/app";

const errorClasses = "border border-1 border-danger"

type FilterRangeProps = {
    onChange: (n: string, v: any) => void
    style?
    labelStyle?
    value: string[]
    error?: boolean
}

const FilterRange = (p: FilterRangeProps) => {
    const handleChange = (n: string, v: string[]) => {
        p.onChange(n, v)
    }
    const stl = {
        marginRight: 15
    }
    return <div className={`d-flex flex-row align-items-center`} style={p.style}>
        <label style={{...p.labelStyle}}>Период</label>
        <div className={`d-flex flex-row ${p.error ? errorClasses : ""}`}>
            <InputDate key={0} style={stl} value={p?.value[0]}
                       onChange={v => handleChange("rangeDate", [v, p.value?.[1]])}/>
            <InputDate key={1} style={stl} value={p?.value[1]}
                       onChange={v => handleChange("rangeDate", [p.value?.[0], v])}/>
        </div>
    </div>
}

type FilterTypeCategoryProps = {
    onChange: (n: string, v: string) => void
    value
    options?
    labelStyle?
    default?
    error?: boolean
}
const FilterTypeCategory = (p: FilterTypeCategoryProps) => {
    useEffect(() => {
        if (p.default) {
            p.onChange("typeCategory", p.default)
        }
    }, [])

    return <div className={`d-flex flex-row `}>
        <label style={p.labelStyle}>Тип учета</label>
        <GroupRadio
            className={p.error ? errorClasses : ""}
            name={"typeCategory"}
            onChange={e => p.onChange("typeCategory", e.target.value)}
            options={p.options || [
                {label: "Д", value: "d"},
                {label: "К", value: "k"},
                {label: "Все", value: ""},
            ]}
            value={p.value}
        />
    </div>
}

const FilterSection = ({options, onChange, value}) => <Select
    options={options}
    currentValue={value}
    onChange={onChange}
/>

type OrderProps = {
    dispatch
    user: UserStore
}

const Order = (p: OrderProps) => {
    const [state, setState] = useState<{
        enabledOrderSubmit: boolean
        filters: ReportFilters[]
        error: ReportFilters[]
        report: Report
    }>({
        enabledOrderSubmit: false,
        filters: [],
        error: [],
        report: null
    })
    const [form, setForm] = useState<ReportJobRequest>({
        code: "",
        userId: p.user.id,
        unit: p.user.unit,
        filters: {
            rangeDate: [formatDateToInput(new Date()), formatDateToInput(new Date())],
            dateStart: formatDateToInput(new Date()),
            dateEnd: formatDateToInput(new Date()),
            rangeSection: [0, 0],
            typeCategory: ""
        },
    })

    const isErrorFields = () => {
        let fields = []
        state.filters.filter(v => state.report?.requireFilters?.indexOf(v) + 1)
            .map(f => fields = [...fields, ...Filters[f].fields])
        const error = fields.filter(v => isEmptyField(form.filters[v]))
        setState(s => ({
            ...s,
            error
        }))
        return !!error.length
    }

    const isErrorField = (code: ReportFilters) => Boolean(state.error.indexOf(code) + 1)

    const cleanedFields = () => {
        let post = {
            ...form,
            filters: {},
        }
        let fields = []
        state.filters.map(f => fields = [...fields, ...Filters[f].fields])
        Object.keys(form.filters).filter(v => Boolean((fields).indexOf(v) + 1))
            .map(v => {
                post.filters[v] = form.filters[v]
            })
        return post
    }

    const onChangeFilter = (name: string, value: any) =>
        setForm(f => ({
            ...f,
            filters: {
                ...f.filters,
                [name]: value
            }
        }))

    const submitReportJob = () => {
        setState(s => ({
            ...s,
            enabledOrderSubmit: false
        }))

        if (isErrorFields()) {
            notifyError("Заполните поля")
            return
        }

        const post = cleanedFields()

        createJob(post)
            .then(res => {
                if (res.success) {
                    notifySuccess("Отчет заказан")
                } else {
                    notifyError(res.message)
                }
            })
    }

    const getFilter = ({code}: { code: ReportFilters }) => {
        const labelStyle = {minWidth: 150}
        const filterStyle = {width: 430}
        const filterHalfStyle = {width: 150}
        switch (code) {
            case "rangeDate":
                return <FilterRange
                    onChange={onChangeFilter} labelStyle={labelStyle}
                    value={form.filters.rangeDate}
                    error={isErrorField(code)}
                />
            case "typeCategoryDK":
                return <FilterTypeCategory
                    onChange={onChangeFilter}
                    value={form.filters?.typeCategory}
                    labelStyle={labelStyle}
                    options={[
                        {label: "Д", value: "d"},
                        {label: "К", value: "k"},
                    ]}
                    default={"k"}
                    error={isErrorField("typeCategory")}
                />
            case "typeCategory":
                return <FilterTypeCategory
                    onChange={onChangeFilter}
                    value={form.filters?.typeCategory}
                    labelStyle={labelStyle}
                    error={isErrorField(code)}
                />
            case "dateStart":
                return <div className={`d-flex flex-row`}>
                    <label style={labelStyle}>С (На)</label>
                    <div className={`d-flex flex-row ${isErrorField(code) ? errorClasses : ""}`}>
                        <InputDate
                            style={filterHalfStyle}
                            value={form.filters?.dateStart}
                            onChange={v => onChangeFilter("dateStart", v)}
                        />
                    </div>
                </div>
            case "dateEnd":
                return <div className={`d-flex flex-row`}>
                    <label style={labelStyle}>По</label>
                    <div className={`d-flex flex-row ${isErrorField(code) ? errorClasses : ""}`}>
                        <InputDate
                            style={filterHalfStyle}
                            value={form.filters?.dateEnd}
                            onChange={v => onChangeFilter("dateEnd", v)}
                        />
                    </div>
                </div>
            case "rangeSection":
                return <div className="d-flex flex-row ">
                    <label style={labelStyle}>Участок</label>
                    {(p.user.access[p.user.unit] & 2) === 2
                        ? <div className={`d-flex flex-row ${isErrorField(code) ? errorClasses : ""}`}>
                            <InputText
                                type={"number"}
                                value={form.filters?.rangeSection[0]}
                                onChange={e => onChangeFilter("rangeSection", [Number(e.target.value), form.filters?.rangeSection[1]])}
                                style={{filterHalfStyle, marginRight: 15}}
                            />
                            <InputText
                                type={"number"}
                                value={form.filters?.rangeSection[1]}
                                onChange={e => onChangeFilter("rangeSection", [form.filters?.rangeSection[0], Number(e.target.value)])}
                                style={{filterHalfStyle}}
                            />
                        </div>
                        : <div style={filterHalfStyle}
                               className={`d-flex flex-row ${isErrorField(code) ? errorClasses : ""}`}>
                            <FilterSection
                                options={[{
                                    label: "-",
                                    value: "0"
                                }, ...p.user.section?.[p.user.unit]?.map(v => ({label: v, value: v}))]}
                                value={form.filters.rangeSection[0]}
                                onChange={(n, v) => onChangeFilter("rangeSection", [Number(v), form.filters?.rangeSection[1]])}
                            />
                        </div>}
                </div>
            case "section":
                return <div className="d-flex flex-row ">
                    <label style={labelStyle}>Участок</label>
                    {(p.user.access[p.user.unit] & 2) === 2
                        ? <div className={`d-flex flex-row ${isErrorField("rangeSection") ? errorClasses : ""}`}>
                            <InputText
                                type={"number"}
                                value={form.filters?.rangeSection[0]}
                                onChange={e => onChangeFilter("rangeSection", [Number(e.target.value), form.filters?.rangeSection[1]])}
                                style={{filterHalfStyle, marginRight: 15}}
                            />
                        </div>
                        : <div style={filterHalfStyle}
                               className={`d-flex flex-row ${isErrorField("rangeSection") ? errorClasses : ""}`}>
                            <FilterSection
                                options={[{
                                    label: "-",
                                    value: "0"
                                }, ...p.user.section?.[p.user.unit]?.map(v => ({label: v, value: v}))]}
                                value={form.filters.rangeSection[0]}
                                onChange={(n, v) => onChangeFilter("rangeSection", [Number(v), form.filters?.rangeSection[1]])}
                            />
                        </div>}
                </div>
            default:
                return null
        }
    }

    useEffect(() => {
        const report = Reports.filter(v => v.code === form.code)?.[0]
        setState(s => ({
            ...s,
            filters: report?.filters || [],
            report: report
        }))
    }, [form.code])

    useEffect(() => {
        setState(s => ({
            ...s,
            enabledOrderSubmit: !!form.code,
            error: []
        }))
    }, [form])

    return <div>
        <div className="d-flex flex-row align-items-center" style={{marginBottom: 15}}>
            <label style={{minWidth: 150}}>Тип отчета</label>
            <div style={{width: 430}}>
                <Select
                    options={[
                        {label: "-", value: ""},
                        ...Reports.sort((a, b) => a.title?.charCodeAt(0) - b.title?.charCodeAt(0))
                            .map(v => ({label: v.title, value: v.code, group: v.reportGroup}))
                    ]}
                    mapper={(v) => {
                        let className = ""
                        if (v.group?.indexOf("notWork") + 1) return null
                        if (v.group?.indexOf("ukl") + 1) className = "bg-warning"
                        return <option className={`${className}`} value={v.value}>{v.label}</option>
                    }}
                    currentValue={form.code}
                    name={"code"}
                    onChange={(n, v) => setForm(f => ({...f, [n]: v}))}
                />
            </div>
        </div>
        {
            state.filters.map((v, i) => <div style={{marginBottom: 15}} key={i}>
                {getFilter({code: v})}
            </div>)
        }
        <div>
            <Button className="btn-outline-primary" onClick={submitReportJob}
                    disabled={!state.enabledOrderSubmit}>Заказать</Button>
        </div>
    </div>
}

export default connect((state: RootStore) => ({
    user: state.user
}))(Order)
