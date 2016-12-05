import { Injectable,Inject } from '@angular/core';
import {NavbarModel} from './../../models/NavbarModel';
import {HttpService} from '../http/http.service';


 @Injectable()
export class MenuService {    
    constructor(@Inject(HttpService)private _httpService: HttpService) { }
    
    GetMenu(callBack) {
    }

    CreateMenu(data, parentRoute) {
         var navModel = new Array<NavbarModel>();
         var m:any;

         data.forEach(m => {
             var  model = new NavbarModel();             
             model.name = m.name;
             model.title = m.name;
             model.imageUrl = m.imageUrl || '';
             model.iconCss = m.iconCss || '';
             model.css = m.css || '';   
             model.parentRoute = parentRoute;
             
            var routeName = m.name;
            if((parentRoute || '') !== '') {
                routeName = parentRoute + '/' + routeName;;
            }

             model.routerName = this.CreateRouterName(routeName);
             model.routerPara = this.CreateRouterPara(m.id);

             model.pageUrl = this.CreatePageUrl(routeName, m.id); 
             model.useAsDefault = m.useAsDefault || false;            

             model.subNav = null;
             model.IsPageLevelSubMenu = (m.IsPageLevelSubMenu || false);

             if(m.subMenu !== null && m.subMenu.length > 0) {
                model.subNav = this.CreateMenu(m.subMenu, model.pageUrl);                     
            } 
            navModel.push(model);
         });

        return navModel;
    }

    CreatePageUrl(routeName, id) {        
        var url = routeName.toLowerCase();
        if((id || '') != '') {
            url += '/' + '4086'
        }
        
        return url;
    }

    CreateRouterName(routeName) {
        if(routeName === null && routeName === undefined || routeName === '' ) {
            return routeName;
        }

        if(routeName[0] === "/") {
            routeName = routeName.slice(1, routeName.length);
        }

        //Replace "/" with "_"
        routeName = routeName.replace(/\//g,"_");

        var newRouteName = '';
        var arrRouteName = routeName.split("_");

        for(var i=0; i < arrRouteName.length - 1; i++) {
            arrRouteName[i]  = this.toTitleCase(arrRouteName[i]); 
        }

        routeName = arrRouteName.join('_');

        routeName = routeName.replace("_4086", "");

        return routeName;
    }

    CreateRouterPara(id) {
        var para = {};
        if((id || '') != '') {
            para[id] = '4086';
        }
        return para;
    }

    FindSubMenu(key, value, callBack) {
        var self = this;
        var data = this.GetMenu(function(data) {
            var _navbar = self.GetObjects(data,key, value);
            if(typeof callBack === 'function') {
                callBack(_navbar);
            }    
        });        
    }

     GetObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.GetObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }        
        return objects;
    }

    toTitleCase(str) {
        return str.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }
}



