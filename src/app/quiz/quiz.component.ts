import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { QuizService } from './services/quiz.service';
import { Question } from './models/question.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuestionState } from '../state/question.reducer';
import { QuestionActions } from '../state/question.actions';
import { Observable } from 'rxjs';
import { selectFeatureQuestions } from '../state/question.selectors';

@Component({
    selector: 'app-quiz',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
    public currentIndex: number = 0;
    public title: string = '';
    public questionsLength: number = 0;
    public questions$: Observable<Question[]> | undefined;

    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute,
        private store: Store<QuestionState>
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.setTitle(params['type']);
            this.quizService.getQuestions().subscribe((data: Question[]) => {
                const selectedQuestions = this.getRandomQuestions(
                    data,
                    params['type']
                );

                this.questionsLength = selectedQuestions.length;
                this.store.dispatch(
                    QuestionActions.initialQuestions({
                        questions: selectedQuestions
                    })
                );

                this.questions$ = this.store.select(selectFeatureQuestions);
            });
        });
    }

    setTitle(type: string) {
        this.title = type === 'quick' ? 'Szybka gra' : 'Normalna gra';
    }

    getRandomQuestions(questions: Question[], type: string): Question[] {
        const numberOfQuestions = type === 'quick' ? 5 : 10;
        return [...questions]
            .sort(() => 0.5 - Math.random())
            .slice(0, numberOfQuestions);
    }

    handleNextQuestion() {
        if (this.currentIndex < this.questionsLength - 1) {
            this.currentIndex++;
        }
    }

    handlePrevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }
}
