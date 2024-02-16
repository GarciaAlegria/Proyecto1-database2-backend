import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,

    stages: [
        { duration: '5m', target: 2000 }, // below normal load
        { duration: '8m', target: 2000 }, 
        { duration: '5m', target: 4000 }, // normal load
        { duration: '8m', target: 4000 },
        { duration: '5m', target: 5000 }, // around the breaking point
        { duration: '8m', target: 5000 },
        { duration: '5m', target: 6500 }, // beyond the breaking point
        { duration: '8m', target: 6500 },
        { duration: '12m', target: 0 }, // scale down. Recovery stage.
    ],
};

const API_BASE_URL = 'https://ingsoft2.onrender.com/api/v1/';

export default () => {
    http.get(`${API_BASE_URL}hospitales`);

    sleep(1);
};

