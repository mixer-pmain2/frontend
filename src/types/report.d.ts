type ReportFilters = "dateStart" | "dateEnd" | "unit" | "category" | "typeCategory" | "typeCategoryDK" | "rangeSection" | "rangeDate" | "section"
type FieldToFilters = "id" | "dateStart" | "dateEnd" | "unit" | "category" | "typeCategory" | "rangeSection" | "rangeDate"
type ReportStatusType = "NEW" | "PROGRESS" | "DONE" | "ERROR"

type ReportTypes = "ReceptionLog" | "VisitsPerPeriod" | "AdmittedToTheHospital" | "ThoseInTheHospital" |
    "DischargedFromHospital" | "Unvisited" | "Registered" | "Deregistered" | "39doctorsForm" | "39FormGeneral" |
    "DLOMagazine" | "ConsistingOnTheSite" | "MismatchOfDiagnoses" | "DischargedAndNotTaken" |
    "MonthlyCompletionPercentage" | "UKL" | "ReceptionSuicidologistServices" | "Average visit" | "ProtocolUKL" |
    "IndicatorsQuality" | "Form030-1u-02" | "HospitalTreatment" | "AmbulatoryTreatment" | "PBSTIN" |
    "TakenOnADN" | "TakenFromADN" | "TakenForADNAccordingToClinical" | "CommitmentOfOODOnADN"

type ReportGroup = "notWork" | "ukl" | "force"

type Report = {
    id: number
    code: ReportTypes
    title: string
    description?: string
    filters: ReportFilters[]
    requireFilters?: ReportFilters[]
    reportGroup?: ReportGroup[]
    order?: number
    unit?: number
    access?: number
}

type ReportJobFilter = {
    id?: number
    rangeDate?: string[]
    dateStart?
    dateEnd?
    category?
    typeCategory?
    rangeSection?: number[]
}

type ReportJobRequest = {
    userId: number
    code: ReportTypes
    unit: number
    filters: ReportJobFilter
}

type ReportJob = {
    id: number
    code: ReportTypes
    filters: ReportJobFilter
    status: ReportStatusType
    date: string
}



