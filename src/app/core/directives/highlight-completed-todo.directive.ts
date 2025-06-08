import {Directive, effect, ElementRef, inject, Input, input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodoDirective {

  isCompleted= input<boolean>(false);
  private el = inject(ElementRef);

  constructor() {
  }
  test= effect(()=>{
    if(this.isCompleted()){
      this.el.nativeElement.style.background = 'yellow';
    }else{
      this.el.nativeElement.style.background = 'transparent';
    }

});
}
