import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'image-editor,[image-editor]',
  template: `
    <ng-content></ng-content>
    <div class="row">
      <button (click)="myModal.open()">Editar</button>
      <modal #myModal (onClose)="onModalClose('modal closed')">
          <modal-header>
            <h1>Imagen</h1>
          </modal-header>
          <modal-content>
            <div class="row">
              <div class="col-md-3">
                <input type="file" ng2FileSelect [uploader]="uploader"/>
              </div>
            </div>
            <div class="row" *ngIf="uploader?.queue.length > 0">
              <div class="col-md-12" style="margin-bottom: 40px">
                <table class="table">
                  <thead>
                  <tr>
                    <th width="50%">Nombre</th>
                    <th>Progreso</th>
                    <th>Estado</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr *ngFor="let item of uploader?.queue">
                    <td><strong>{{ item?.file?.name }}</strong></td>
                    <td>
                      <div class="progress" style="margin-bottom: 0;">
                        <div class="progress-bar" role="progressbar" [style.width.%]="uploader.progress"></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                      <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </modal-content>
          <modal-footer>
            <button class="btn btn-primary" (click)="myModal.close()">close</button>
          </modal-footer>
      </modal>
    </div>
  `
})


export class ImageEditorComponent implements OnInit, AfterViewInit {
  public uploader:FileUploader;
  private defaultOptions: any;

  @Input() model: string;
  @Output() modelChange = new EventEmitter();
  @Input() options: Object;

  constructor() {
    this.defaultOptions = {allowedMimeType: ['image/jpeg', 'image/png' ]};
  }

  ngOnInit() {
    if(this.options){
      if(!this.options.hasOwnProperty('url')){
        console.warn('Image editor: url in options attribute is required');
        throw 'Image editor: url in options attribute is required';
      }
      Object.assign(this.defaultOptions,this.options);
    }
    this.uploader = new FileUploader(this.defaultOptions);
  }

  ngAfterViewInit(){
    this.uploader.onAfterAddingFile = (item) => {
      this.uploader.progress = 0;
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      var extension = item.file.name.split('.').pop();
      var fileName = item.file.name.replace(/\.[^/.]+$/, "");
      item.file.name = fileName + '_' + Math.floor(Date.now() / 1000) + '.' + extension;
      this.uploader.setOptions({additionalParameter: {previousImage:this.model}});
      item.upload();
    }

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item, response, status, header) => {
      if (status === 200) {
        this.model = response;
        this.modelChange.emit(this.model);
      }
    }
  }

  public onModalClose(e: any){
    console.log('closed');
  }

}
