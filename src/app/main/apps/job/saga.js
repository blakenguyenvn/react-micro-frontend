import { call, takeEvery, put } from 'redux-saga/effects';
import { getJob } from './store/jobSlice';
import { getJobs } from './store/jobListSlice';
import services from './services';
import constants from './constants';

export function* getJobDetail(request) {
	try {
		const result = yield call(() => services.getJob(request));
		yield put(getJob(result.data));
	} catch (e) {
		yield put({ type: constants.JOB_DETAIL_FETCH });
	}
}

export function* getJobsList(request) {
	try {
		const result = yield call(() => services.getJobs(request));
		yield put(getJobs(result.data));
	} catch (e) {
		yield put({ type: constants.JOB_DETAIL_FETCH });
	}
}

export default function* jobSaga() {
	yield takeEvery(constants.GET_JOB_LIST, getJobsList);
	yield takeEvery(constants.GET_JOB_DETAIL, getJobDetail);
}
