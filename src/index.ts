import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlEditorComponent } from './inline-edition/html-editor/html-editor.component';
import { ImageEditorComponent } from './inline-edition/image-editor/image-editor.component';
import { InlineEditableDirective } from './inline-edition/content-editor/inline-editable.directive';
import { ModalModule } from 'ngx-modal';
import { FileUploadModule } from 'ng2-file-upload';

export * from './inline-edition/html-editor/html-editor.component';
export * from './inline-edition/image-editor/image-editor.component';
export * from './inline-edition/content-editor/inline-editable.directive';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FileUploadModule
  ],
  declarations: [
    HtmlEditorComponent,
    ImageEditorComponent,
    InlineEditableDirective
  ],
  exports: [
    HtmlEditorComponent,
    ImageEditorComponent,
    InlineEditableDirective
  ]
})
export class InlineEditionModule { }
