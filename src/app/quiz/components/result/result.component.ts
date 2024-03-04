import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { QuestionState } from '../../../state/question.reducer';
import { Observable } from 'rxjs';
import { selectBarProgression } from '../../../state/question.selectors';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
    public quizIsEnded: boolean = false;
    public quizProgress$: Observable<number> | undefined;

    constructor(private store: Store<QuestionState>) {}

    ngOnInit() {
        this.quizProgress$ = this.store.select(selectBarProgression);
    }

    handleResult() {
        this.quizIsEnded = true;
    }
}
