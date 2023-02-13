import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'academy-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    @Input() placeholder = '';
    @Input() value = '';
    @Input() type = 'normal';
    @Input() name = 'normal'
    @Output() keyPress = new EventEmitter<string>()
    @Output() onBlur = new EventEmitter<string>()

    @Input() ngModel: string = '';

    label = '';

    constructor(

    ) {

    }
    ngOnInit(): void {
    }

    onKey(event: KeyboardEvent) { 
        this.keyPress.emit((event.target as HTMLInputElement).value );
    }

    update(value: string) {
        this.onBlur.emit(value);
    }
}