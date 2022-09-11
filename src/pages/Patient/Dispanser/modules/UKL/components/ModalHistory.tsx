import React, {useState} from "react";
import Modal, {BTN_CLOSE, BTN_CUSTOM} from "components/Modal";
import HistoryUKL from "../HistoryUKL";
import {notifyError, notifySuccess} from "components/Notify";
import {createJob} from "api/report";
import {useNavigate} from "react-router-dom";


type ModalHistoryProps = {
    isShow: boolean
    onClose?
    isType?: number
    patient: PatientStore
    user: UserStore
}

const ModalHistory = (p: ModalHistoryProps) => {
    const [state, setState] = useState({
        id: 0
    })

    const navigate = useNavigate()

    const handleSelectUkl = (row: UKLData) => {
        setState(s => ({
            ...s,
            id: row.id
        }))
    }

    const handleCreateReport = () => {
        createJob({
            userId: p.user.id,
            unit: p.user.unit,
            code: "ProtocolUKL",
            filters: {
                id: state.id
            }
        })
            .then(res => {
                if (res.success) {
                    notifySuccess("Отчет заказан. Перейдите в \"Отчеты\"")
                    // navigate(linkDict.report)
                } else {
                    notifyError(res.message)
                }
            })
    }

    return <Modal
        style={{minWidth: 800}}
        onClose={p.onClose}
        isOpen={p.isShow}
        body={<HistoryUKL
            patient={p.patient}
            onSelect={handleSelectUkl}
            isType={p.isType}
        />}
        onCustom={handleCreateReport}
        customTitle={"Заказать отчет"}
        btnNum={BTN_CLOSE|(state.id ? BTN_CUSTOM : 0)}
    />
}

export default ModalHistory
