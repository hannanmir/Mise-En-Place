import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPantry() {
    try {
        let response = yield axios.get('/api/pantry')
        console.log('Pantry:', response.data);
        yield put({type:'SET_PANTRY', payload: response.data});
    } catch (error) {
        console.log('error in getPantry', error)
    }
}

function* getFridge() {
    try {
        let response = yield axios.get('/api/pantry/fridge')
        console.log('Fridge:', response.data);
        yield put({type:'SET_FRIDGE', payload: response.data});
    } catch (error) {
        console.log('error in getFridge', error)
    }
}

function* addIngredient(action) {
    try {
        yield axios.post('/api/pantry', action.payload )
        yield put({ type: 'GET_PANTRY' })
        yield put({ type: 'GET_FRIDGE' })
    } catch (error) {
        console.log('error in addIngredient', error);
    }
}

function* removeIngredient(action) {
    try {
        yield axios.delete(`/api/pantry/${action.payload}`)
        yield put({ type: 'GET_PANTRY' })
        yield put({ type: 'GET_FRIDGE' })
    } catch (error) {
        console.log('error in removeIngredient', error);
    }
}

function* editIngredient(action) {
    try {
        yield axios.put(`/api/pantry/`, action.payload)
        yield put({ type: 'GET_PANTRY' })
        yield put({ type: 'GET_FRIDGE' })
    } catch (error) {
        console.log('error in editIngredient', error);
    }
}

function* getRecipeIngredient(action) {
    try {
        let response = yield axios.get(`/api/pantry/recipe/${action.payload}`)
        console.log('Recipe Ingredients:', response.data);
        yield put({type:'SET_INGREDIENTS', payload: response.data});
    } catch (error) {
        console.log('error in getRecipeIngredients', error)
    }
}

function* addRecipeIngredient(action) {
    try {
        yield axios.post('/api/pantry/recipe', action.payload )
    } catch (error) {
        console.log('error in addRecipeIngredient', error);
    }
}

function* pantrySaga() {
    yield takeLatest('GET_PANTRY', getPantry);
    yield takeLatest('GET_FRIDGE', getFridge);
    yield takeLatest('GET_INGREDIENTS', getRecipeIngredient);
    yield takeLatest('ADD_INGREDIENT', addIngredient);
    yield takeLatest('REMOVE_INGREDIENT', removeIngredient);
    yield takeLatest('EDIT_INGREDIENT', editIngredient);
    yield takeLatest('ADD_RECIPE_INGREDIENT', addRecipeIngredient);
}

export default pantrySaga;