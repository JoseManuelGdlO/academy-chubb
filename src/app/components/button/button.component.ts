import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'academy-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    
    @Input() text = '';
    @Input() type = ''
    @Input() backgroundcolor = "black"
    @Output() onClick = new EventEmitter();

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

    click(){
        this.onClick.emit();
    }
}