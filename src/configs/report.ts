import {iota} from "../utility/app";

export const Filters: {[name:string]: {title: string, fields: FieldToFilters[]}} = {
    rangeDate: {
        title: "Период",
        fields: ["rangeDate"]
    },
    dateStart: {
        title: "На",
        fields: ["dateStart"]
    },
    dateEnd: {
        title: "По",
        fields: ["dateEnd"]
    },
    unit: {
        title: "Подразделение",
        fields: ["unit"]
    },
    category: {
        title: "Категория",
        fields: ["category"]
    },
    typeCategory: {
        title: "Учет",
        fields: ["typeCategory"]
    },
    typeCategoryDK: {
        title: "Учет",
        fields: ["typeCategory"]
    },
    rangeSection: {
        title: "Участок(ки)",
        fields: ["rangeSection"]
    },
    section: {
        title: "Участок",
        fields: ["rangeSection"]
    }
}

export const CategoryType = {
    k: "К",
    d: "Д"
}

export const Reports: Report[] = [
    {
        id: iota(),
        code: "ReceptionLog",
        title: "Журнал приема",
        filters: ["dateStart"],
        requireFilters: ["dateStart"]
    },
    {
        id: iota(),
        code: "VisitsPerPeriod",
        title: "Посещения за период",
        filters: ["rangeDate"],
        requireFilters: ["dateStart"]
    },
    {
        id: iota(),
        code: "AdmittedToTheHospital",
        title: "Поступившие в стационар",
        filters: ["rangeDate", "rangeSection"],
        requireFilters: ["rangeDate", "rangeSection"]
    },
    {
        id: iota(),
        code: "DischargedFromHospital",
        title: "Выписанные из стационара",
        filters: ["rangeDate", "rangeSection"],
        requireFilters: ["rangeDate", "rangeSection"]
    },
    {
        id: iota(),
        code: "Unvisited",
        title: "Непосещенные",
        filters: ["dateStart", "rangeSection", "typeCategory"],
        requireFilters: ["dateStart", "rangeSection"]
    },
    {
        id: iota(),
        code: "Registered",
        title: "Взятые на учет",
        filters: ["rangeDate", "rangeSection", "typeCategoryDK"],
        requireFilters: ["rangeDate", "rangeSection", "typeCategoryDK"]
    },
    {
        id: iota(),
        code: "Deregistered",
        title: "Снятые с учета",
        filters: ["rangeDate", "rangeSection", "typeCategoryDK"],
        requireFilters: ["rangeDate", "rangeSection", "typeCategoryDK"]
    },
    {
        id: iota(),
        code: "39FormGeneral",
        title: "39 форма общая",
        filters: ["rangeDate"],
        requireFilters: ["rangeDate"],
        reportGroup: ["notWork"]
    },
    {
        id: iota(),
        code: "ConsistingOnTheSite",
        title: "Состоящие на участке",
        filters: ["rangeDate", "section", "typeCategory"],
        requireFilters: ["rangeDate", "section"]
    },
    {
        id: iota(),
        code: "MonthlyCompletionPercentage",
        title: "Месячный % выполнения",
        filters: ["rangeDate"],
        reportGroup: ["notWork"]
    },
    {
        id: iota(),
        code: "UKL",
        title: "УКЛ",
        filters: ["rangeDate"],
        reportGroup: ["ukl", "notWork"]
    },
]
