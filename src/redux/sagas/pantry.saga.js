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

function* addIngredient(action) {
    try {
        yield axios.post('/api/pantry', action.payload )
        yield put({ type: 'GET_PANTRY' })
    } catch (error) {
        console.log('error in addIngredient', error);
    }
}

function* removeIngredient(action) {
    try {
        yield axios.delete(`/api/pantry/${action.payload}`)
        yield put({ type: 'GET_PANTRY' })
    } catch (error) {
        console.log('error in removeIngredient', error);
    }
}

function* editIngredient (action) {
    try {
        yield axios.put(`/api/pantry/`, action.payload)
        yield put({ type: 'GET_PANTRY' })
    } catch (error) {
        console.log('error in editIngredient', error);
    }
}

function* pantrySaga() {
    yield takeLatest('GET_PANTRY', getPantry);
    yield takeLatest('ADD_INGREDIENT', addIngredient);
    yield takeLatest('REMOVE_INGREDIENT', removeIngredient);
    yield takeLatest('EDIT_INGREDIENT', editIngredient);
}

export default pantrySaga;