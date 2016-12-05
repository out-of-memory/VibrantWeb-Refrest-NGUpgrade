import { Injectable } from '@angular/core';
import {ControlMeta} from '../Models/ControlMeta';


export class ControlMetaService {

    controlsMetaList: { [id: string]: { [id: string]: ControlMeta } } = {};
    modelAction: { [id: string]: { [id: string]: any } } = {};

    private static _instance: ControlMetaService;

    addNewMeta(meta: ControlMeta) {
        this.controlsMetaList[meta.hub] = this.controlsMetaList[meta.hub] === undefined ? {} : this.controlsMetaList[meta.hub];
        var metaItem = this.controlsMetaList[meta.hub].hasOwnProperty(meta.name) ? this.controlsMetaList[meta.hub][meta.name] : null;

        if (metaItem === null) {
            this.controlsMetaList[meta.hub][meta.name] = meta;

        }
        else
            throw `Defination for ${meta.name} is already present in ${meta.hub} Hub! System cannot hold dupicate entry. Please modify your code.`;
    }


    addModelAction(key: string, actions: any) {
        if (this.modelAction[key] === undefined)
            this.modelAction[key] = actions;

    }

    getModelAction(key: string) {
        if (this.modelAction[key] !== undefined)
            return this.modelAction[key];
        return null;

    }


    getControlMeta(hub: string): { [id: string]: ControlMeta } {
        let meta: { [id: string]: ControlMeta } = {};
        meta = this.controlsMetaList[hub];
        if (meta === undefined)
            throw `Given Key '${hub}' is not present in the Controls Meta list. Pleadse check your code`;
        return meta;
    }

    static Instance() {
        if (ControlMetaService._instance == null)
            ControlMetaService._instance = new ControlMetaService();
        return ControlMetaService._instance;



    }

}