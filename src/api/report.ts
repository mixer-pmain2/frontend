import {API, request} from "./request";


export const createJob = (payload: ReportJobRequest): Promise<SuccessResponse> =>
    request("POST", API + `/report/order/`, {}, payload)

export const getJobs = (payload: {userId}): Promise<ReportJob[]> =>
    request("GET", API + `/report/`, {}, payload)

export const downloadReport = (payload: {id, filename}) =>
fetch(API + `/report/download/?id=${payload.id}`)
    .then(response => response.blob())
    .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${payload.filename}.xlsx`;
        link.click();
    })
