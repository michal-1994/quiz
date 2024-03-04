import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionState } from './question.reducer';

export const selectFeature = createFeatureSelector<QuestionState>('store');

export const selectQuestions = createSelector(
    selectFeature,
    state => state.questions
);

export const selectBarProgression = createSelector(
    selectQuestions,
    questions => {
        const questionsAnsweredLength = questions.filter(
            question => question.answerIndex !== undefined
        ).length;

        if (questions.length !== 0) {
            return (questionsAnsweredLength * 100) / questions.length;
        }
        return 0;
    }
);

export const selectQuizEnded = createSelector(
    selectFeature,
    state => state.quizIsEnded
);
