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
    on(QuestionActions.initialQuestions, (state, { questions }) => ({
        ...state,
        questions
    })),
    on(QuestionActions.updateQuestion, (state, { questionId, answerIndex }) => {
        const newQuestions = state.questions.map((question: Question) =>
            question.id === questionId ? { ...question, answerIndex } : question
        );
        return {
            ...state,
            questions: newQuestions
        };
    })
);