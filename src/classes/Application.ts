export default class Application {
    private _application: ApplicationStore
    private _params: ApplicationParams[]

    constructor(obj) {
        this._application = obj
    }

    getParam = (param: string) => {
        if (!this._params) {
            this._params = []
            this._application?.params.map(v => this._params[v.param] = v)
        }
        return this._params[param]
    }

    getParams = (param: string) => {
        return this._application.params.filter(v => v.param == param)
    }

}
