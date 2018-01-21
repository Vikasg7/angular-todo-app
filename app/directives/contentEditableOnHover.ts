import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
   selector: "[content-editable-on-hover]"
})
export class ContentEditableOnHover {

   constructor(private _el: ElementRef) { }

   @HostListener("click")
   onClick(e: Event) {
      const ele = this._el.nativeElement
      ele.contentEditable = "true"
      ele.focus()
   }

   @HostListener("blur")
   onBlur(e: Event) {
      const ele = this._el.nativeElement
      ele.contentEditable = "false"
   }
}