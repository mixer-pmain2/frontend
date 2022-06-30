import React, {useState} from "react";
import {PageTitleLvl2} from "../../components/Title";
import InputText from "../../components/Input/text";
import Button from "../../components/Button";
import {ProfilePageProps} from "./index";
import {changePassword} from "../../api/user";
import {notifyError, notifySuccess} from "../../components/Notify";


const ChangePassword = (p: ProfilePageProps) => {
    const [state, setState] = useState<{
        passNotEqual?: boolean
        shortPass?: boolean
    }>({
        passNotEqual: false,
    })

    const [form, setForm] = useState<{ newPassword2 } & ChangePassword>({
        password: "",
        newPassword: "",
        newPassword2: "",
        userId: p.user.id

    })

    const onChange = (e) => {
        setForm(f => ({
            ...f,
            [e.target.name]: e.target.value,
            passNotEqual: false,
            shortPass: false
        }))
    }

    const submitChangePassword = () => {
        if (form.newPassword.length < 6) {
            setState(s => ({
                ...s,
                shortPass: true
            }))
            return
        }
        if (form.newPassword !== form.newPassword2) {
            setState(s => ({
                ...s,
                passNotEqual: true
            }))
            return
        }

        changePassword(form)
            .then((res: SuccessResponse) => {
                if (res.success) {
                    notifySuccess("Пароль обновлен")
                } else {
                    notifyError(res.message)
                }
            })
    }

    return <div>
        <PageTitleLvl2 title={"Изменить пароль"}/>
        <InputText
            type={"password"}
            title={"Введите текущий пароль"} style={{marginBottom: 10}} isRow={false} value={form.password}
            name={"password"} onChange={onChange}
        />
        <InputText
            type={"password"}
            title={"Новый пароль"} style={{marginBottom: 10}} isRow={false} value={form.newPassword}
            name={"newPassword"} onChange={onChange}
            error={state.shortPass && "Короткий пароль"}
        />
        <InputText
            type={"password"}
            title={"Повторите новый пароль"} style={{marginBottom: 10}} isRow={false} value={form.newPassword2}
            name={"newPassword2"} onChange={onChange}
            error={state.passNotEqual && "Пароль не совпадает"}
        />
        <Button className="btn-outline-primary" onClick={submitChangePassword}>Изменить</Button>
    </div>
}

export default ChangePassword
