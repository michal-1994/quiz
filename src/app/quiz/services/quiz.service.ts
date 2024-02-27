import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionData } from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private questionsUrl = 'assets/api/questions.json';

    constructor(private http: HttpClient) {}

    getQuestionData(): Observable<QuestionData> {
        return this.http.get<QuestionData>(this.questionsUrl);
    }
}
