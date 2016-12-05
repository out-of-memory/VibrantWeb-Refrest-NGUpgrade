import { AutoMapperService } from '../services'
import { Utility } from './../Helper/Utility';
import { ControlMeta } from '../infrastructure/models/ControlMeta'
export class CardModel<M>{
    model: M | Array<M>;
    private backUpModel: M | Array<M>
    private _model: M | Array<M>;
    private _automapper: AutoMapperService;
    private _isViewOnly: boolean;
    private _visibility: boolean;
    id: number;
    private _approvalArr: Array<number>;
    private newModelHub: any;
    get isViewOnly(): boolean {
        return this._isViewOnly;
    }

    _isArray: boolean;
    constructor(id: number, type: { new (): M; }, isArray: boolean, automapper: AutoMapperService, data: any, isViewOnly: boolean, approvalArray) {
        this._isArray = isArray;
        this._isViewOnly = isViewOnly;
        this._automapper = automapper;
        this.id = id;
        this._approvalArr = approvalArray;
        this._model = new type();
        if (isArray) {
            this.model = this.backUpModel = [];
            if (data != null)
                this.FillArray(data);
        }
        else {
            this.model = this.backUpModel = this._model;
            if (data != null && data != undefined) {
                this._automapper.Map(data, this.model);
                this.backUpModel = Utility.clone(this.model);
            }
            else {
                this.backUpModel = Utility.clone(this.model);
            }
        }
    }

    get hub(): ControlMeta {
        let _hub = null;
        return this._model["hub"];
    }

    readOnlyFormState: boolean = true;

    private FillArray(data: any) {
        this.model = [];
        for (var i = 0; i < data.length; i++) {
            (this.model as Array<any>).push(data[i]);
        }
        this.backUpModel = Utility.clone(this.model);
    }

    getChangeSet(componentName: string, componentId: number, by?: string): ChangeSet<M> {
        return new ChangeSet<M>(this.backUpModel, this.model, this.setApprovalFlag(), componentName, componentId);
    }

    resetModel() {
        this.model = JSON.parse(JSON.stringify(this.backUpModel))
    }
    resetDataModel() {
        return JSON.parse(JSON.stringify(this.backUpModel))
    }
    setApprovalFlag(): boolean {
        let pass = false;
        if (this._approvalArr) {
            for (var i = 0; i < this._approvalArr.length; i++) {
                if (this.id == this._approvalArr[i]) {
                    pass = true;
                    break;
                }
            }
        }
        return pass;
    }
}

export class GridCardModel<M> extends CardModel<M>{
    _type: { new (): M; };
    constructor(id: number, type: { new (): M; }, isArray: boolean, _automapper: AutoMapperService, private data: any, isViewOnly: boolean, approvalArray) {
        super(id, type, isArray, _automapper, data, isViewOnly, approvalArray);
        this._type = type;
        this.resetNewModel();
    }
    newModel: M;
    resetNewModel() {
        this.newModel = new this._type();

    }

    getChangeSet(componentName: string, componentId: number, by?: string): ChangeSet<M> {
        var parentChangeSet = super.getChangeSet(componentName, componentId);
        parentChangeSet._oldModel = (parentChangeSet._oldModel as Array<M>).find(obj => obj[by] === parentChangeSet._newModel[by]) || null;
        return parentChangeSet;
    }
}

export class ChangeSet<M>{
    constructor(private oldModel: M | Array<M>, private newModel: M | Array<M>, private sendForApproval: boolean, private moduleCode: string, private moduleId: number) { }
    get _oldModel(): M | Array<M> { return Utility.clone(this.oldModel); }
    set _oldModel(value: M | Array<M>) {
        this.oldModel = value;
    }
    get _newModel(): M | Array<M> { return Utility.clone(this.newModel); }
}