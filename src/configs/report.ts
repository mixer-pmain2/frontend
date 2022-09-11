import {iota} from "../utility/app";
import {Unit} from "../consts/user";

export const Filters: { [name: string]: { title: string, fields: FieldToFilters[] } } = {
    id: {
        title: "Номер",
        fields: ["id"]
    },
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
        filters: ["dateStart", "unit"],
        requireFilters: ["dateStart", "unit"],
        order: 1
    },
    {
        id: iota(),
        code: "VisitsPerPeriod",
        title: "Посещения за период",
        filters: ["rangeDate"],
        requireFilters: ["dateStart"],
        order: 2
    },
    {
        id: iota(),
        code: "AdmittedToTheHospital",
        title: "Поступившие в стационар",
        filters: ["rangeDate", "rangeSection"],
        requireFilters: ["rangeDate", "rangeSection"],
        order: 3
    },
    {
        id: iota(),
        code: "ThoseInTheHospital",
        title: "Находящиеся в стационаре",
        filters: ["rangeSection"],
        requireFilters: ["rangeSection"],
        order: 4
    },
    {
        id: iota(),
        code: "DischargedFromHospital",
        title: "Выписанные из стационара",
        filters: ["rangeDate", "rangeSection"],
        requireFilters: ["rangeDate", "rangeSection"],
        order: 5
    },
    {
        id: iota(),
        code: "Unvisited",
        title: "Непосещенные",
        filters: ["dateStart", "rangeSection", "typeCategory"],
        requireFilters: ["dateStart", "rangeSection"],
        order: 6
    },
    {
        id: iota(),
        code: "Registered",
        title: "Взятые на учет",
        filters: ["rangeDate", "rangeSection", "typeCategoryDK"],
        requireFilters: ["rangeDate", "rangeSection", "typeCategoryDK"],
        order: 7
    },
    {
        id: iota(),
        code: "Deregistered",
        title: "Снятые с учета",
        filters: ["rangeDate", "rangeSection", "typeCategoryDK"],
        requireFilters: ["rangeDate", "rangeSection", "typeCategoryDK"],
        order: 8
    },
    {
        id: iota(),
        code: "Form39General",
        title: "39 форма общая",
        filters: ["rangeDate", "unit"],
        requireFilters: ["rangeDate", "unit"],
        // reportGroup: ["notWork"],
        order: 9
    },
    {
        id: iota(),
        code: "ConsistingOnTheSite",
        title: "Состоящие на участке",
        filters: ["rangeDate", "section", "typeCategory"],
        requireFilters: ["rangeDate", "section"],
        order: 10
    },
    {
        id: iota(),
        code: "MonthlyCompletionPercentage",
        title: "Месячный % выполнения",
        filters: ["rangeDate"],
        reportGroup: ["notWork"],
        order: 11
    },
    {
        id: iota(),
        code: "UKL",
        title: "УКЛ",
        filters: ["rangeDate"],
        requireFilters: ["rangeDate"],
        reportGroup: ["ukl", "notWork"],
        order: 12
    },
    {
        id: iota(),
        code: "ProtocolUKL",
        title: "Протокол УКЛ",
        filters: ["rangeDate"],
        requireFilters: ["rangeDate"],
        reportGroup: ["ukl", "notWork"],
        order: 12
    },
    {
        id: iota(),
        code: "HospitalTreatment",
        title: "Стационарное лечение",
        filters: ["dateStart"],
        requireFilters: ["dateStart"],
        reportGroup: ["force"],
        order: 20,
        unit: Unit.АПЛ
    },
    {
        id: iota(),
        code: "AmbulatoryTreatment",
        title: "Амбулаторное лечение",
        filters: ["dateStart"],
        requireFilters: ["dateStart"],
        reportGroup: ["force"],
        order: 21,
        unit: Unit.АПЛ
    },
    {
        id: iota(),
        code: "PBSTIN",
        title: "ПБСТИН (Кострома)",
        filters: ["dateStart"],
        requireFilters: ["dateStart"],
        reportGroup: ["force"],
        order: 22,
        unit: Unit.АПЛ
    },
    {
        id: iota(),
        code: "TakenOnADN",
        title: "Взятые на АДН",
        filters: ["rangeDate", "rangeSection"],
        requireFilters: ["rangeDate", "rangeSection"],
        reportGroup: ["force"],
        order: 23,
        unit: Unit.АПЛ
    },
    {
        id: iota(),
        code: "TakenFromADN",
        title: "Снятые с АДН",
        filters: ["rangeDate", "rangeSection"],
        requireFilters: ["rangeDate", "rangeSection"],
        reportGroup: ["force"],
        order: 24,
        unit: Unit.АПЛ
    },
    {
        id: iota(),
        code: "TakenForADNAccordingToClinical",
        title: "Взятые на АДН по клиническим",
        filters: ["rangeDate"],
        requireFilters: ["rangeDate"],
        reportGroup: ["force"],
        order: 25,
        unit: Unit.АПЛ
    },
    {
        id: iota(),
        code: "CommitmentOfOODOnADN",
        title: "Совершение ООД на АДН",
        filters: ["rangeDate"],
        reportGroup: ["force", "notWork"],
        order: 26,
        unit: Unit.АПЛ
    },
]

export const UnShowFilters: ReportFilters[] = ["dateStart", "dateEnd", "rangeDate", "unit"]
