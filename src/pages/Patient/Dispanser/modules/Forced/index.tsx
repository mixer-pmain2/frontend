import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {PageTitle} from "components/Title";
import {getForcedM} from "api/patient";
import Table from "components/Table";
import {formatDate, formatDateToInput} from "utility/string";
import Viewed from "./Viewed";
import Button from "components/Button";
import Icons from "components/Icons";
import NewViewed from "./NewViewed";
import ModalNewForced from "./ModalNewForced";
import User from "../../../../../classes/User";
import {Access} from "../../../../../consts/user";
import ModalEndForced from "./ModalEndForced";


const mapper = (row: ForcedMData) => {
    return <>
        <td>{row.number}</td>
        <td>{formatDate(row.dateStart)}</td>
        <td>{formatDate(row.dateEnd)}</td>
        <td>{row.watch}</td>
        <td>{row.mechanism}</td>
        <td>{row.state}</td>
    </>
}

type ForcedProps = {
    dispatch
    patient: PatientStore
    user: UserStore
}

const Forced = (p: ForcedProps) => {
    const u = new User(p.user)
    const [state, setState] = useState({
        forcedData: [],
        number: 0,
        showNewViewed: false,
        showNewForced: false,
        showEndForced: false,
        edited: (u.access & Access.dispanser["Работа с принудкой"]) > 0
    })

    const updateForced = () => {
        getForcedM({patientId: p.patient.id, cache: false})
            .then(res => {
                if (Array.isArray(res)) {
                    setState(s => ({
                        ...s,
                        forcedData: res
                    }))
                }
            })
    }

    useEffect(() => {
        updateForced()
    }, [])

    return <div>
        <PageTitle title={"Принудительное лечение"}/>
        <div className="d-flex flex-row">
            <Button
                className="btn-outline-primary" style={{marginRight: 5}}
                onClick={_ => setState(s => ({...s, showNewForced: true}))}
            >
                {Icons.event.add}
            </Button>
            <Button
                className="btn-outline-primary" style={{marginRight: 5}}
                onClick={_ => setState(s => ({...s, showNewViewed: true}))}
            >
                {Icons.event.search}
            </Button>
            <Button
                className="btn-outline-primary"
                onClick={_ => setState(s => ({...s, showEndForced: true}))}
            >
                {Icons.module.dispanser.forced}
            </Button>
        </div>
        <Table
            data={state.forcedData}
            columns={["№", "Начало", "Конец", "ВидПЛ", "Механизм ООД", "Статьи УК"]}
            mapper={mapper}
            onClick={(v: ForcedMData) => setState(s => ({
                ...s,
                number: v.number
            }))}
            selecting={true}
        />
        {state.number
            ? <Viewed patient={p.patient} number={state.number}/>
            : null
        }
        <NewViewed
            show={state.showNewViewed}
            onClose={() => setState(s => ({...s, showNewViewed: false}))}
            viewedRow={{
                id: 0,
                viewDate: "",
                doctorName1: "",
                doctorName2: "",
                conclusion: "",
                actNumber: 0,
                actDate: "",
                view: "",
                courtDate: "",
                courtConclusionDate: "",
                type: "",
                dateEnd: "",
                courtName: "",
                number: state.number,
            }}
            onUpdate={updateForced}
        />
        <ModalNewForced
            show={state.showNewForced}
            onClose={() => setState(s => ({...s, showNewForced: false}))}
            onUpdate={updateForced}
        />
        <ModalEndForced
            show={state.showEndForced}
            onClose={() => setState(s => ({...s, showEndForced: false}))}
            onUpdate={updateForced}
        />

    </div>
}

export default connect((state: RootStore) => ({
    user: state.user,
    patient: state.patient
}))(Forced)
