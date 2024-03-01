import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionState } from './question.reducer';

export const selectFeature = createFeatureSelector<QuestionState>('store');

export const selectFeatureQuestions = createSelector(
    selectFeature,
    state => state.questions
);
