import { fork, all } from 'redux-saga/effects';
import jobSaga from 'app/main/apps/job/saga';

export default function* rootSaga() {
	yield all([fork(jobSaga)]);
}
