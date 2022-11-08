import axios from 'axios';
import { clientId } from '../config/settings';
import storeInit from "../redux/store"

const httpRequest = async (url, method = 'get', body = null, headers={}, others) => {
    const token = storeInit.store.getState()?.user?.user?.token
   
    try {
        const response = await axios({
            url,
            method,
            data: body === null ? null : {...clientId, ...body} ,
            headers: {
                Authorization: `Bearer ${token}`,
                apiKey: process.env.REACT_APP_ENCRYPTION_KEY,
              },
            ...others,
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export default httpRequest;