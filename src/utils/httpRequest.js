import axios from 'axios';
import { clientId } from '../config/settings';

const httpRequest = async (url, method = 'get', body = null, headers={}, others) => {
    try {
        const response = await axios({
            url,
            method,
            data: body === null ? null : {...clientId, ...body} ,
            headers,
            ...others,
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export default httpRequest;