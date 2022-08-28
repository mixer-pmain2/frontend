import {accessModule, accessRole, unit} from '../configs/access'
import icons from 'components/Icons'
import {iota} from "../utility/app";

export const app = {
    DISPANSER: iota(),
    STAC: iota()
}

const initModule = {
    id: 0,
    title: 'name',
    img: false,
    unit: 0,
    access: 0,
    patientRequire: false
}

export const dispanserSubModules = {
    visit: {
        id: iota(),
        title: 'Прием пациента',
        img: icons.module.dispanser.visit,
        unit: accessModule.dispanser.visit.unit,
        access: accessModule.dispanser.visit.access,
        patientRequire: true
    },
    history: {
        id: iota(),
        title: 'История',
        img: icons.module.dispanser.history,
        unit: accessModule.dispanser.history.unit,
        access: accessModule.dispanser.history.access,
        patientRequire: true
    },
    uchet: {
        id: iota(),
        title: 'Учет',
        img: icons.module.dispanser.uchet,
        unit: accessModule.dispanser.uchet.unit,
        access: accessModule.dispanser.uchet.access,
        patientRequire: true
    },
    invalid: {
        id: iota(),
        title: 'Инвалидность',
        img: icons.module.dispanser.invalid,
        unit: accessModule.dispanser.invalid.unit,
        access: accessModule.dispanser.invalid.access,
        patientRequire: true
    },
    custody: {
        id: iota(),
        title: 'Опекунство',
        img: icons.module.dispanser.custody,
        unit: accessModule.dispanser.custody.unit,
        access: accessModule.dispanser.custody.access,
        patientRequire: true
    },
    groupWork: {
        id: iota(),
        title: 'Групповая работа',
        img: icons.module.dispanser.groupWork,
        unit: accessModule.dispanser.groupWork.unit,
        access: accessModule.dispanser.groupWork.access,
        patientRequire: false
    },
    vaccinations: {
        id: iota(),
        title: 'Прививки',
        img: icons.module.dispanser.vaccinations,
        unit: accessModule.dispanser.vaccinations.unit,
        access: accessModule.dispanser.vaccinations.access,
        patientRequire: true
    },
    infection: {
        id: iota(),
        title: 'Инфекционные заболевания',
        img: icons.module.dispanser.infection,
        unit: accessModule.dispanser.infection.unit,
        access: accessModule.dispanser.infection.access,
        patientRequire: true
    },
    UKL: {
        id: iota(),
        title: 'УКЛ',
        img: icons.module.dispanser.UKL,
        unit: accessModule.dispanser.UKL.unit,
        access: accessModule.dispanser.UKL.access,
        patientRequire: true
    },
    prof: {
        id: iota(),
        title: 'Профосмотры',
        img: icons.module.dispanser.prof,
        unit: accessModule.dispanser.Prof.unit,
        access: accessModule.dispanser.Prof.access,
        patientRequire: false
    },
    section23: {
        id: iota(),
        title: 'Оформление статьи 23',
        img: icons.module.dispanser.section23,
        unit: accessModule.dispanser.section23.unit,
        access: accessModule.dispanser.section23.access,
        patientRequire: true
    },
    passport: {
        id: iota(),
        title: 'Паспортные данные',
        img: icons.module.dispanser.passport,
        unit: accessModule.dispanser.passport.unit,
        access: accessModule.dispanser.passport.access,
        patientRequire: true
    },
    section22: {
        id: iota(),
        title: 'Статья 22',
        img: icons.module.dispanser.section22,
        unit: accessModule.dispanser.section22.unit,
        access: accessModule.dispanser.section22.access,
        patientRequire: true
    },
    ood: {
        id: iota(),
        title: 'Профилактика  ООД',
        img: icons.module.dispanser.ood,
        unit: accessModule.dispanser.ood.unit,
        access: accessModule.dispanser.ood.access,
        patientRequire: true
    },
    forced: {
        id: iota(),
        title: "Принудительное лечение",
        img: icons.module.dispanser.forced,
        unit: accessModule.dispanser.forced.unit,
        access: accessModule.dispanser.forced.access,
        patientRequire: true
    }

}

export const appPages = {
    dispanser: dispanserSubModules,
    report: {
        ...initModule,
        id: iota(),
        title: 'Отчеты',
        img: false,
        unit: 0,
        access: 0,
    },
    administration: {
        id: iota(),
        title: 'Администрирование',
        img: null,
        unit: unit.disp,
        access: accessRole.dispanser.administrator
    }
}

export const loadComponent = {
    find_by_fio: iota(),
    find_by_address: iota(),
    find_by_id: iota(),
    history_visit: iota(),
    history_hospital: iota(),
    history_uchet: iota(),
    history_vaccination: iota(),
    history_invalid: iota(),
    history_syndrome: iota(),
    history_custody: iota(),
    ood: {
        sod: iota(),
        oodLast: iota(),
        findSection29: iota(),
        section22: iota()
    },
    administration: {
        locationDoctor: {
            doctor: iota()

        }
    }
}
