import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPantry(action) {
    try {
        let response = yield axios.get(`/api/pantry/${action.payload.id}`)
        console.log('Pantry:', response.data);
        yield put({type:'SET_PANTRY', payload: response.data});
    } catch (error) {
        console.log('error in getPantry', error)
    }
}

function* pantrySaga() {
    yield takeLatest('GET_PANTRY', getPantry);
}

export default pantrySaga;