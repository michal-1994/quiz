import { Question } from './../quiz/models/question.model';
import { createReducer, on } from '@ngrx/store';
import { QuestionActions } from './question.actions';

export interface QuestionState {
    questions: Question[];
}

export const initialState: QuestionState = {
    questions: []
};

export const questionReducer = createReducer(
    initialState,
    on(QuestionActions.initialQuestions, (state, { questions }) => {
        console.log(questions);
        return state;
    }),
    on(QuestionActions.updateQuestion, (state, { questionId, answerIndex }) => {
        console.log(questionId, answerIndex);
        return state;
    })
);
