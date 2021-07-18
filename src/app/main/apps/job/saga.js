import { call, takeEvery, put } from 'redux-saga/effects';
import { getJob, setJob } from './store/jobSlice';
import { getJobs, setJobs } from './store/jobListSlice';
import services from './services';

const constant = {
	GET_JOB_FAILED: 'GET_JOB_FAILED',
	GET_JOB_LIST_FAILED: 'GET_JOB_LIST_FAILED'
};

export function* getJobSaga(request) {
	try {
		const result = yield call(() => services.getJob(request));
		yield put(setJob(result.data));
	} catch (e) {
		yield put({ type: constant.GET_JOB_FAILED });
	}
}

export function* getJobsSaga(request) {
	try {
		const result = yield call(() => services.getJobs(request));
		yield put(setJobs(result.data));
	} catch (e) {
		yield put({ type: constant.GET_JOB_LIST_FAILED });
	}
}

export default function* jobSaga() {
	yield takeEvery(getJob.type, getJobSaga);
	yield takeEvery(getJobs.type, getJobsSaga);
}
