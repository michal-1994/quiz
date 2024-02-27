import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { QuizService } from './services/quiz.service';
import { Question, QuestionData } from './models/question.model';

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
    public questions: Question[] = [];
    public questionsLength: number | null = null;

    constructor(private quizService: QuizService) {}

    ngOnInit() {
        this.quizService
            .getQuestionData()
            .subscribe((questionData: QuestionData) => {
                this.questions = questionData.questions;
                this.questionsLength = questionData.length;

                console.log('QuizComponent [ngOnInit]: ', this.questions);
                console.log('QuizComponent [ngOnInit]: ', this.questionsLength);
            });
    }
}
