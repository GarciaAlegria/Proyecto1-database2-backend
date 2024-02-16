import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,

    stages: [
        { duration: '8m', target: 5000 }, // Simular el incremento en el trafico de 1 a 100 usuarios en 5 minutos
        { duration: '10m', target: 5000 }, // Mantenerse en 100 usuarios por 10 minutos
        { duration: '8m', target: 0 }, // Decrementar a 0 usuarios en 5 minutos
    ],

    thresholds: {
        http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2000ms
    },
};

const API_BASE_URL = 'https://ingsoft2.onrender.com/api/v1/';

export default () => {
    http.get(`${API_BASE_URL}hospitales`);

    sleep(1);
};

