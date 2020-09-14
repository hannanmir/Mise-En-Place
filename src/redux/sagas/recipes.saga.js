import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRecipes() {
    try {
        let response = yield axios.get('/api/recipe')
        console.log('Recipes:', response.data);
        yield put({type:'SET_RECIPES', payload: response.data});
    } catch (error) {
        console.log('error in getRecipes', error)
    }
}

function* addRecipe(action) {
    try {
        yield axios.post('/api/recipe', action.payload )
        yield put({ type: 'GET_RECIPES' })
    } catch (error) {
        console.log('error in addRecipe', error);
    }
}

function* recipesSaga() {
    yield takeLatest('GET_RECIPES', getRecipes);
    yield takeLatest('ADD_RECIPE', addRecipe);
}

export default recipesSaga;