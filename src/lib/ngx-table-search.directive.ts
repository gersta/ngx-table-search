import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ngxTableSearch]'
})
export class NgxTableSearchDirective {

  @HostListener('keyup')
  onKeyUp() {
    // don't do anything. Just fetch the event to trigger the change detection
  }
}
