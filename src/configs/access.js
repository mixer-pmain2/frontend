//сравниваем права Юзера с правами доступа для "Объекта"
import {Access, Unit} from "consts/user";

export const isAccessed = (accessList, uUnit, uAccess) => {
    for (let i = 0; i < accessList.length; i++) {
        const unit = accessList[i].unit
        const access = accessList[i].access
        if (uUnit === unit && (uAccess & access) > 0)
            return true
    }
    return false
}

export const accessRole = {
    dispanser: {
        asu: Access.dispanser["Прямой доступ к данным"],
        doct: Access.dispanser["Прием пациентов"] |
            Access.dispanser["Работа с инвалидностью"],
        registrator: Access.dispanser["Работа регистратора"] | Access.dispanser["Только просмотр (справочная система)"],
        ukl: Access.dispanser["Ввод УКЛ 1 уровня"] |
            Access.dispanser["Ввод УКЛ 2 уровня"] |
            Access.dispanser["Ввод УКЛ 3 уровня"],
        administrator: Access.dispanser["Администрирование АПЛ"] |
            Access.dispanser["Администр. взрослого диспансера"] |
            Access.dispanser["Администрирование ОИЛС"] |
            Access.dispanser["Администрирование психотерапии"] |
            Access.dispanser["Администр. детского диспансера"]
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
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: unit.disp,
        },
        history: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.administrator,
            unit: unit.disp,
        },
        uchet: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.administrator,
            unit: unit.disp,
        },
        invalid: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: unit.disp,
        },
        custody: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: unit.disp,
        },
        groupWork: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: unit.disp,
        },
        vaccinations: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: unit.disp,
        },
        infection: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: unit.disp,
        },
        UKL: {
            access: accessRole.dispanser.asu | accessRole.dispanser.UKL,
            unit: unit.disp,
        },
        Prof: {
            access: accessRole.dispanser.asu | accessRole.dispanser.doct,
            unit: Unit["Подростковая психиатрия"] | Unit["Детская консультация"] | Unit["Детский диспансер"],
        }
    }
}

export const accessPage = {
    dispanser: [
        {
            unit: 1,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 2,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 4,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 8,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 16,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 1024,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 2048,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 16777216,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
        },
        {
            unit: 33554432,
            access: accessRole.dispanser.doct | accessRole.dispanser.registrator | accessRole.dispanser.asu | accessRole.dispanser.UKL | accessRole.dispanser.administrator
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
        {unit: 1, access: 1073741824},
        {unit: 2, access: 1073741824},
        {unit: 4, access: 1073741824},
        {unit: 8, access: 1073741824},
        {unit: 16, access: 1073741824},
        {unit: 32, access: 1073741824},
        {unit: 64, access: 1073741824},
        {unit: 128, access: 1073741824},
        {unit: 256, access: 1073741824},
        {unit: 512, access: 1073741824},
        {unit: 1024, access: 1073741824},
        {unit: 2048, access: 1073741824},
        {unit: 4096, access: 1073741824},
        {unit: 8192, access: 1073741824},
        {unit: 65536, access: 1073741824},
        {unit: 131072, access: 1073741824},
        {unit: 262144, access: 1073741824},
        {unit: 524288, access: 1073741824},
        {unit: 1048576, access: 1073741824},
        {unit: 2097152, access: 1073741824},
        {unit: 4194304, access: 1073741824},
        {unit: 8388608, access: 1073741824},
        {unit: 16777216, access: 1073741824},
        {unit: 33554432, access: 1073741824},
        {unit: 67108864, access: 1073741824},
        {unit: 134217728, access: 1073741824},
        {unit: 268435456, access: 1073741824},
        {unit: 536870912, access: 1073741824},
        {unit: 1073741824, access: 1073741824},
    ]
}

