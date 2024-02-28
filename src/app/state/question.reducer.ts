import { Question } from './../quiz/models/question.model';
import { createReducer, on } from '@ngrx/store';
import { QuestionActions } from './question.actions';

export interface QuestionState {
    numberOfQuestions: number | undefined;
    questions: Question[];
}

export const initialState: QuestionState = {
    numberOfQuestions: undefined,
    questions: []
};

export const questionReducer = createReducer(
    initialState,
    on(QuestionActions.setNumberOfQuestions, (state, { numberOfQuestions }) => {
        return {
            ...state,
            numberOfQuestions: numberOfQuestions
        };
    }),
    on(QuestionActions.initialQuestions, (state, { questions }) => {
        console.log(questions);
        return state;
    }),
    on(QuestionActions.updateQuestion, (state, { questionId, answerIndex }) => {
        console.log(questionId, answerIndex);
        return state;
    })
);
