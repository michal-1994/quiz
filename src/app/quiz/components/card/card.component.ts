import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, FormsModule, MatRadioModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
    @Input() data: Question | undefined;
    public youtAnswer: string = '';

    ngOnInit() {
        console.log(this.data);
    }
}
