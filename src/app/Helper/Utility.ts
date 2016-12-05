export class Utility{

      static clone(obj:any):any{
            var type=typeof(obj);
            if(type==="string"||type==='number')
              throw new Error('provided object cannot be string or number for cloingn process');
            else
            return JSON.parse(JSON.stringify(obj));
      }



}