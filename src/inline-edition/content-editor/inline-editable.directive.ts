import {Directive, ElementRef, Input, Output, EventEmitter, Renderer} from "@angular/core";
import {OnChanges, SimpleChanges, OnInit} from "@angular/core";

@Directive({
  selector: '[inlineEditableModel]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class InlineEditableDirective implements OnChanges, OnInit {
  @Input('inlineEditableModel') model: any;
  @Output('inlineEditableModelChange') update = new EventEmitter();

  protected previousValue: any;

  constructor(public elRef: ElementRef, public renderer: Renderer) {}

  ngOnInit() {
    this.renderer.setElementAttribute(this.elRef.nativeElement, 'contenteditable', 'true');
    this.renderer.setElementStyle(this.elRef.nativeElement, 'cursor', 'pointer');
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['model'].firstChange || (changes['model'].previousValue != changes['model'].currentValue)){
      this.previousValue = changes['model'].currentValue;
      this.refreshView();
    }
  }

  onBlur() {
    var value = this.elRef.nativeElement.innerText
    if(this.previousValue != value){
      this.update.emit(value);
    }
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model
  }
}
