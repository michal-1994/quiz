import { Question } from './../quiz/models/question.model';
import { createReducer, on } from '@ngrx/store';
import { QuestionActions } from './question.actions';

export interface QuestionState {
    questions: Question[];
    quizIsEnded: boolean;
}

export const initialState: QuestionState = {
    questions: [],
    quizIsEnded: false
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
    }),
    on(QuestionActions.updateQuiz, (state, { quizIsEnded }) => {
        return {
            ...state,
            quizIsEnded
        };
    })
);
