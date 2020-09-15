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

function* getFavorites() {
    try {
        let response = yield axios.get('/api/recipe/favorites')
        console.log('Favorities:', response.data);
        yield put({type:'SET_FAVORITES', payload: response.data});
    } catch (error) {
        console.log('error in getFavorites', error)
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

function* addFavorite(action) {
    try {
        yield axios.post('/api/recipe/favorites', action.payload )
        yield put({ type: 'GET_FAVORITES' })
    } catch (error) {
        console.log('error in addFavorite', error);
    }
}

function* removeFavorite (action){
    try {
        yield axios.delete(`/api/recipe/favorites/${action.payload}`)
        yield put({ type: 'GET_FAVORITES' })
    } catch (error) {
        console.log('error in removeFavorite', error);
    }
}
function* recipesSaga() {
    yield takeLatest('GET_RECIPES', getRecipes);
    yield takeLatest('ADD_RECIPE', addRecipe);
    yield takeLatest('GET_FAVORITES', getFavorites);
    yield takeLatest('ADD_FAVORITE', addFavorite);
    yield takeLatest('REMOVE_FAVORITE', removeFavorite);
}

export default recipesSaga;