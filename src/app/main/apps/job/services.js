import VinUtils from '@vincore/utils/VinUtils';
import API from 'api';
import _ from 'lodash';
/* eslint-disable camelcase */

class JobDetailService extends VinUtils.EventEmitter {
	getJob = requestData => {
		const { payload } = requestData;

		return new Promise((resolve, reject) => {
			API.get(`/position/${payload.jobId}`).then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});
	};

	putJob = requestData => {
		return new Promise((resolve, reject) => {
			API.put(`/position/${requestData.jobId}`, requestData).then(
				response => {
					if (response) {
						resolve(response);
					} else {
						reject(response);
					}
				}
			);
		});
	};

	getJobs = () => {
		return new Promise((resolve, reject) => {
			API.get(`/job/search/?q=company_id:15602`).then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});
	};
}

const instance = new JobDetailService();

export default instance;
