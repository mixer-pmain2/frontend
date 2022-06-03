import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Layout from "pages/Layout";
import {PageTitle} from "components/Title";
import {notifyError, notifyInfo, notifySuccess} from "components/Notify";
import {newPatient} from "store/actions/patient";
import {useNavigate} from "react-router-dom";
import {linkDict} from "../../../routes";
import * as appActions from "store/actions/application";
import * as patientActions from "store/actions/patient";
import FormNewPatient from "pages/Patient/New/form";
import FoundTable from "pages/Patient/New/found";
import {formatDate} from "utility/string";

const mapper = (row) => {
    return <>
        <th scope="row">
            {row.id}
        </th>
        <td>
            {row.lname}
        </td>
        <td>
            {row.fname}
        </td>
        <td>
            {row.sname}
        </td>
        <td>
            {formatDate(row.bday)}
        </td>
    </>
}

const NewPatient = ({dispatch, user}) => {
    const navigate = useNavigate()
    const [found, setFound] = useState([])
    const [form, setForm] = useState({
        lname: "",
        fname: "",
        sname: "",
        bday: "",
        isAnonim: false,
        sex: "",
        userId: user.id,
        isForced: false
    })

    const goBack = () => {
        setFound([])
    }

    const redirectToPatient = async (id) => {
        await dispatch(patientActions.findById({id}))
            .then(res => {
                if (res?.id) {
                    dispatch(patientActions.select(res))
                    navigate(linkDict.patient.replace(/:id/g, id))
                } else {
                    notifyInfo("Нет данных")
                }
            })
            .finally(_ => {
            })
    }

    const handleSubmit = async () => {
        if (!form.bday) {
            notifyError("Дата не задана")
            return
        }
        if (!form.sex) {
            notifyError("Не выбран пол пациента")
            return
        }

        dispatch(appActions.enableLoading())
        let patientId = null
        const result = await dispatch(newPatient(form))

        if (result.success) {
            if (result.isForced) {
                notifySuccess("Пациент создан")
                patientId = result.data[0]?.id
                await redirectToPatient(patientId)
            } else {
                setFound(result.data)
            }

        } else {
            notifyError(result.message)
            dispatch(appActions.disableLoading())
            return
        }
        dispatch(appActions.disableLoading())

    }

    const handleNewPatient = async () => {
        await setForm({
            ...form,
            isForced: true
        })
    }

    useEffect(() => {
        if (form.isForced) {
            handleSubmit()
        }

    }, [form.isForced])

    return <Layout>
        <PageTitle title={"Новый пациент"}/>
        {found.length === 0 && <FormNewPatient
            form={form} setForm={setForm}
            onSubmit={handleSubmit}
        />}
        {found.length > 0 && <FoundTable
            data={found}
            mapper={mapper}
            onCreate={handleNewPatient}
            goBack={goBack}
        />}
    </Layout>
}

export default connect(state => ({
    user: state.user
}))(NewPatient)
