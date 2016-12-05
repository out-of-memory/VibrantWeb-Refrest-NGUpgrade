import { Directive, ElementRef, Input, Renderer } from '@angular/core';
declare var $: any;
@Directive({ selector: '[updateMaterializeParams]' })
export class UpdateMaterializeParams {

    constructor(private el: ElementRef, renderer: Renderer) {


    }

    @Input()
    set updateParams(params: any) {
        if (params)
            this.performElementUpdates(params);
    }
    performElementUpdates(params) {
        var picker = $(this.el.nativeElement)
            .pickadate("picker")
        if (picker && picker.set) {
            params.forEach(item => {
                picker.set(item, params[item]);
            });
        }

    }
}




@Directive({ selector: '[restrictValueTo]' })
export class RestrictValueTo {

    constructor(private el: ElementRef, renderer: Renderer) {


    }

    private keys: Array<string> = ['max', 'numbersOnly'];

    /*
       {max:100,
        validate:["numbersOnly",'characters']
       }
    
    */

    @Input()
    restrictOptions: any;

    ngOnInit() {

        let elem = $(this.el.nativeElement);

        elem.on("keyup", () => {
            if (this.restrictOptions) {
                let options = JSON.parse(this.restrictOptions);

                // for (var item in options)     RS: This is how this should be done
                //     elem.val(classa[item](options[item], elem));
                if (options["max"]) {
                    if (elem.val().length > options["max"]) {
                        elem.val(elem.val().substring(0, options["max"]));
                    }

                }
                if (options["numbersOnly"]) {
                    var reg = new RegExp('^[0-9]+$');
                    if (!reg.test(elem.val())) {
                        elem.val("");
                        elem.change();
                    }
                }

            }


        })

    }


}