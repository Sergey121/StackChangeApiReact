import axios from 'axios';
import {toSearchParams, extractData} from '../utils/jsUtils';

class QuestionService {
    constructor() {
        this.rootUrl = `https://api.stackexchange.com/2.2/questions`;
    }

    static _setSite(params) {
        params.set('site', 'stackoverflow');
    }

    getAll(requestParams = {}) {
        let params = toSearchParams(requestParams);

        QuestionService._setSite(params);

        return axios.get(this.rootUrl, {params})
            .then(extractData);
    }

    get(id, requestParams) {
        let params = toSearchParams(requestParams);

        QuestionService._setSite(params);
        params.set('filter', '!9YdnSIN18');

        return axios.get(`${this.rootUrl}/${id}`, {params})
            .then(extractData);
    }
}

export default QuestionService;
