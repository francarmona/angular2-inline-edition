# angular2-inline-edition

## Installation

To install this library, run:

```bash
$ npm install angular2-inline-edition --save
```

## Consuming your library

Import the library by running:

```bash
$ npm install angular2-inline-edition
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { InlineEditionModule } from 'angular2-inline-edition';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify the library as an import
    InlineEditionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use its components and directives in your Angular application:

```xml
<!-- You can now use the library in app.component.html -->
<h1>
  {{title}}
</h1>

<!-- Html editor -->
<div style="font-size:20px;padding:35px" html-editor [tinymceOptions]="{menubar:false}" [(model)]="title"></div>

<!-- Inline content editor -->
<h3 [(inlineEditableModel)]="title"></h3>

<!-- Image editor -->
<image-editor [(model)]="item.image" [options]="{url: 'http://post-url-to-upload-image', allowedMimeType: ['image/jpeg', 'image/png' ]}">
  <img style="max-width:200px" [src]="item.image" />
</image-editor>
```

## License

MIT © [Francisco Carmona](mailto:fcarmona.olmedo@gmail.com)
