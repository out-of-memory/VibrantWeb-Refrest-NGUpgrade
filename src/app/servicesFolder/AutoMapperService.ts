import { Injectable } from '@angular/core';
 @Injectable()
export class AutoMapperService {    
    constructor() { }
    Map(source, target) {
         for (var sourceProperty in source) {
              for(var targetProperty in target) {
                    var sourceValue = (sourceProperty || '').toLowerCase();
                    var targetValue = (targetProperty || '').toLowerCase();
                    
                    if(targetValue === sourceValue) {
                         target[targetProperty] = source[sourceProperty];
                         break;
                    }
              }
         }
    }
}



