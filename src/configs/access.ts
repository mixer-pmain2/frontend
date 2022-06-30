//сравниваем права Юзера с правами доступа для "Объекта"
import {Access, Unit} from "consts/user";

export const isAccessed = (accessList, uUnit, uAccess) => {
    for (let i = 0; i < accessList.length; i++) {
        const unit = accessList[i].unit
        const access = accessList[i].access
        if ((uUnit === unit || unit === 0) && (((uAccess & access) > 0) || (access === 0)))
            return true
    }
    return false
}

export const isAccessedPage = (accessList: {access: number, unit: number}[], user: UserStore) => {
    return isAccessed(accessList, user.unit, user.access?.[user.unit])
}

export const accessRole = {
    dispanser: {
        asu: Access.dispanser["Прямой доступ к данным"],
        doct: Access.dispanser["Прием пациентов"],
        registrator: Access.dispanser["Работа регистратора"],
        ukl: Access.dispanser["Ввод УКЛ 1 уровня"] |
            Access.dispanser["Ввод УКЛ 2 уровня"] |
            Access.dispanser["Ввод УКЛ 3 уровня"],
        administrator: Access.dispanser["Администрирование АПЛ"] |
            Access.dispanser["Администр. взрослого диспансера"] |
            Access.dispanser["Администрирование ОИЛС"] |
            Access.dispanser["Администрирование психотерапии"] |
            Access.dispanser["Администр. детского диспансера"],
        other: Access.dispanser["Работа с принудкой"] | Access.dispanser["Только просмотр (справочная система)"]
    }
}

export const unit = {
    disp: Unit.АПЛ |
        Unit["Взрослая психиатрия"] |
        Unit.Специалисты |
        Unit["Детская консультация"] |
        Unit["Детский диспансер"] |
        Unit["Подростковая психиатрия"] |
        Unit.ОИЛС |
        Unit.Суицидология

}

export const accessModule = {
    dispanser: {
        visit: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"],
            unit: unit.disp,
        },
        Prof: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"],
            unit: Unit["Подростковая психиатрия"] | Unit["Детская консультация"] | Unit["Детский диспансер"],
        },
        history: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                accessRole.dispanser.registrator |
                accessRole.dispanser.administrator |
                Access.dispanser["Только просмотр (справочная система)"],
            unit: unit.disp,
        },
        uchet: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                accessRole.dispanser.registrator |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"],
            unit: unit.disp,
        },
        invalid: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Работа с инвалидностью"] |
                Access.dispanser["Только просмотр (справочная система)"] |
                accessRole.dispanser.registrator,
            unit: unit.disp,
        },
        custody: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"],
            unit: unit.disp,
        },
        groupWork: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Групповой ввод"],
            unit: unit.disp,
        },
        vaccinations: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"],
            unit: unit.disp,
        },
        infection: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"] |
                Access.dispanser["Только просмотр (справочная система)"] |
                Access.dispanser["Работа регистратора"],
            unit: unit.disp,
        },
        UKL: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.ukl,
            unit: unit.disp,
        },
        section23: {
            access: accessRole.dispanser.asu |
                Access.dispanser["Работа с 23-ей статьёй"],
            unit: unit.disp,
        },
        passport: {
            access: accessRole.dispanser.asu |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"] |
                accessRole.dispanser.doct,
            unit: unit.disp,
        },
        section22: {
            access: accessRole.dispanser.asu |
                accessRole.dispanser.doct,
            unit: unit.disp,
        },
    }
}

export const accessPage = {
    dispanser: [
        {
            unit: 1,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 2,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 4,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 8,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 16,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 1024,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 2048,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 16777216,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
        {
            unit: 33554432,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu |
                accessRole.dispanser.ukl | accessRole.dispanser.administrator | accessRole.dispanser.other
        },
    ],
    administration: [
        {unit: Unit["Взрослая психиатрия"], access: accessRole.dispanser.administrator},
        {unit: Unit["АПЛ"], access: accessRole.dispanser.administrator},
        {unit: Unit["Детская консультация"], access: accessRole.dispanser.administrator},
        {unit: Unit["Детский диспансер"], access: accessRole.dispanser.administrator},
        {unit: Unit["ОИЛС"], access: accessRole.dispanser.administrator},
        {unit: Unit["Подростковая психиатрия"], access: accessRole.dispanser.administrator},
        {unit: Unit["Специалисты"], access: accessRole.dispanser.administrator},
        {unit: Unit["Детская консультация"], access: accessRole.dispanser.administrator},
    ],
    adminAsu: [
        {unit: 0, access: 1073741824}
    ],
    findPatient: [
        {
            unit: 0,
            access: 0
        }
    ],
    newPatient: [
        {
            unit: 0,
            access: accessRole.dispanser.doct |
                accessRole.dispanser.asu |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"]
        }
    ],
    report: [
        {
            unit: 0,
            access: accessRole.dispanser.doct |
                accessRole.dispanser.asu |
                Access.dispanser["Администр. взрослого диспансера"] |
                Access.dispanser["Администр. детского диспансера"] |
                Access.dispanser["Работа регистратора"]
        }
    ],
    profile: [
        {
            unit: 0,
            access: 0
        }
    ]
}

