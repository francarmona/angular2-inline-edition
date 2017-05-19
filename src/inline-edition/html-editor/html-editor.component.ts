import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, NgZone } from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';
import { UUID } from 'angular2-uuid';

// You can import it on your app.component.ts (include it in your .angular-cli.json as well)
//import 'tinymce/plugins/table';
//import 'tinymce/plugins/link';

declare var tinymce: any;

@Component({
  selector: 'html-editor,[html-editor]',
  template: '<div id="{{elementId}}" [ngStyle]="styles"></div>'
})
export class HtmlEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() styles: any = {};
  @Input() model: string;
  @Input() tinymceOptions: Object;
  @Output('modelChange') modelChange = new EventEmitter();

  public elementId: string;
  protected editor: any;
  protected tinymceDefaultOptions: any;
  protected defaultStyles: any = {
    cursor:'pointer'
  };


  constructor(public ref: NgZone) {}

  ngOnInit() {
    this.elementId = UUID.UUID();
    this.tinymceDefaultOptions = {
      selector: '#' + this.elementId,
      //plugins: ['code'],
      menubar: false,
      //toolbar: "table",
      forced_root_block : '',
      skin_url: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.6.1/skins/lightgray',
      inline:true,
      setup: (editor: any) => {
        this.editor = editor;
        editor.on('blur', () => {
          const content = editor.getContent();
          this.ref.run(() => {
            this.model = content;
            this.modelChange.emit(content);
          });
        });

        editor.on('init', (e: any) => {
          this.editor.setContent(this.model);
        });
      },
    };
    if(this.tinymceOptions){
      Object.assign(this.tinymceDefaultOptions,this.tinymceOptions);
    }
    Object.assign(this.styles,this.defaultStyles);
  }

  ngAfterViewInit(){
    tinymce.init(this.tinymceDefaultOptions);
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}