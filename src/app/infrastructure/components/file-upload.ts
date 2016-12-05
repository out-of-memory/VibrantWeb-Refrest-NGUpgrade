import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpSettings } from '../../services/http/http.settings';
import { CacheService } from '../../services';
import { FileExtension } from '../../infrastructure/pipes/pipes';

@Component({
    selector: 'file-upload',
    template: `
                <div>
                        <div class="custom-input-field col s12">
                            <div class="file-field custom-file input-field">
                                <div class="btn btn-flat">
                                    <span class="fa fa-cloud-upload"></span>
                                    <input type="file" (change)="onFileChange($event)">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="{{PlaceHolder}}" style="margin-left: 5px;cursor: none;" maxlength="0">
                                    <span class="right progress-indicator">{{status}}</span>
                                    <b class="hover-expense-img" *ngIf="fileurl|fileExt">
                                        <a href="" class="expense-icon padding-zero" (click)="eyeCLicked($event)">
                                            <i class="fa fa-eye" aria-hidden="true" title="View"></i>
                                            <span class="z-depth-1">
                                            <img [src]="fileurl" alt="image" class="responsive-img"></span>
                                        </a>
                                    </b>
                                </div>
                            </div>
                        </div>
                </div>
                `,
    styles:
    [`
        .progress-bar
        {
            background-color: aquamarine;    
        }
        .file-field input.file-path {
            width: 60%;
        }   
        span.progress-indicator {
            line-height: 3;
        }
        .file-path-wrapper
        {
            overflow:visible;
        }
    `]
    , pipes: [FileExtension]
})

export class FileUpload {
    progress: number;
    uploadStatus: string = '';
    @Output() Uploaded = new EventEmitter();
    @Input() ModuleType: string;
    status: string = '';
    authToken: any = '';
    @Input() fileurl: string = '';
    @Output() validateImage = new EventEmitter();
    @Input() PlaceHolder: string;
    @Input() toDisplay: boolean = false;

    constructor(private _cacheService: CacheService) {
        this.authToken = this._cacheService.getParams('auth_token');
    }

    onFileChange(event) {
        //  console.log("ModuleType: " + this.ModuleType);

        let files = event.target.files;
        this.progress = 0;
        let formData: FormData = new FormData(), xhr = new XMLHttpRequest();

        // var regex = new RegExp("(.*?)\.(jpeg|jpg|png)$");
        // if (!(regex.test(files[0].type))) {
        //     // alert('Please select an image of jpeg, jpg or png file format.');
        //     this.validateImage.emit('');
        //     event.target.value = '';
        //     return false;
        // }
        if (files.length <= 0) {
            this.uploadStatus = '';
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }
        let url = HttpSettings.apiBaseUrl + "v1/image/upload/" + this.ModuleType;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // console.log("Status Code: " + 200);
                }
                else {
                }
            }
        };

        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);
            // console.log(this.progress);
            if (this.progress < 1) {
                this.uploadStatus = this.uploadStatus + 'Uploading';
            }
            else if (this.progress === 100) {
                this.uploadStatus = this.uploadStatus + 'Saved..!!';
                this.status = '100 %';
            }
            else {
                this.uploadStatus = this.uploadStatus + this.progress + ' %';
                this.status = '100 %';
            }
        };

        xhr.onloadend = (event) => {
            this.uploadStatus = xhr.responseText;
            let filename = JSON.parse(xhr.responseText).name;
            let fielExtension = filename.substr(filename.lastIndexOf('.') + 1);

            if (fielExtension == "jpeg" || fielExtension == "jpg" || fielExtension == "png" || fielExtension == "gif") {
                this.toDisplay = true;
            }
            this.status = '100 %';
            this.fileurl = JSON.parse(xhr.responseText).name;
            this.Uploaded.emit(xhr.responseText);
        }

        xhr.upload.onerror = (event) => {
            // console.log(xhr.responseText);
        }


        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', 'bearer ' + this.authToken.access_token);

        xhr.send(formData);

    }

    eyeCLicked(event) {
        event.preventDefault();
    }
}