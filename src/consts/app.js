import {accessModule} from "../configs/access";
import icons from "components/Icons";

export const app = {
  DISPANSER: 0,
  STAC: 1
}

const initModule = {
  id: 0,
  title: "name",
  img: false,
  unit: 0,
  access: 0,
  patientRequire: false
}

export const subModules = {
  report: {
    ...initModule,
    id: 101,
    title: "Отчеты",
    img: false,
    unit: 0,
    access: 0,
  }
}

export const dispanserSubModules = {
  visit: {
    id: 0,
    title: "Прием пациента",
    img: icons.module.dispanser.visit,
    unit: accessModule.dispanser.visit.unit,
    access: accessModule.dispanser.visit.access,
    patientRequire: true
  },
  history: {
    id: 1,
    title: "История",
    img: icons.module.dispanser.history,
    unit: accessModule.dispanser.history.unit,
    access: accessModule.dispanser.history.access,
    patientRequire: true
  },
  uchet: {
    id: 2,
    title: "Учет",
    img: icons.module.dispanser.uchet,
    unit: accessModule.dispanser.uchet.unit,
    access: accessModule.dispanser.uchet.access,
    patientRequire: true
  },
  invalid: {
    id: 3,
    title: "Инвалидность",
    img: icons.module.dispanser.invalid,
    unit: accessModule.dispanser.invalid.unit,
    access: accessModule.dispanser.invalid.access,
    patientRequire: true
  },
  custody: {
    id: 4,
    title: "Опекунство",
    img: icons.module.dispanser.custody,
    unit: accessModule.dispanser.custody.unit,
    access: accessModule.dispanser.custody.access,
    patientRequire: true
  },
  groupWork: {
    id: 5,
    title: "Групповая работа",
    img: icons.module.dispanser.groupWork,
    unit: accessModule.dispanser.groupWork.unit,
    access: accessModule.dispanser.groupWork.access,
    patientRequire: false
  },
  vaccinations: {
    id: 6,
    title: "Прививки",
    img: icons.module.dispanser.vaccinations,
    unit: accessModule.dispanser.vaccinations.unit,
    access: accessModule.dispanser.vaccinations.access,
    patientRequire: true
  },
  infection: {
    id: 7,
    title: "Инфекционные заболевания",
    img: icons.module.dispanser.infection,
    unit: accessModule.dispanser.infection.unit,
    access: accessModule.dispanser.infection.access,
    patientRequire: true
  },
  UKL: {
    id: 8,
    title: "УКЛ",
    img: icons.module.dispanser.UKL,
    unit: accessModule.dispanser.UKL.unit,
    access: accessModule.dispanser.UKL.access,
    patientRequire: true
  },
  prof: {
    id: 9,
    title: "Профосмотры",
    img: icons.module.dispanser.prof,
    unit: accessModule.dispanser.Prof.unit,
    access: accessModule.dispanser.Prof.access,
    patientRequire: false
  }

}
