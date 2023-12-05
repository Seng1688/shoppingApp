import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.show') isOpen = true;
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}