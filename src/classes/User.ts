import {Access} from "../consts/user";
import {accessRole} from "../configs/access";

export default class User {
    private user: UserStore

    constructor(obj: UserStore) {
        this.user = obj
    }

    get access(): number {
        return this.user.access[this.user.unit]
    }

    get unit(): number {
        return this.user.unit
    }

    isAdmin(): boolean {
        return (this.user.access[this.user.unit] & Access.dispanser["Прямой доступ к данным"]) > 0
    }

    isAdministrator(): boolean {
        return (this.user.access[this.user.unit] & (
            Access.dispanser["Администр. взрослого диспансера"] |
            Access.dispanser["Управление амбулаторной службой"] |
            Access.dispanser["Администр. детского диспансера"]
        )) > 0
    }

    isDoctor(): boolean {
        return (this.user.access[this.user.unit] | accessRole.dispanser.administrator | accessRole.dispanser.doct) > 0
    }

    getAccess(): number {
        return this.user.access[this.user.unit]
    }

    getSection(): number[] {
        return this.user.section?.[this.user.unit]
    }

    isUnit(unit: number): boolean {
        return (this.unit & unit) > 0
    }

}
