const express = require('express');
const axios = require('axios');
const http = require('http');

const app = express();
const PORT = 8090;

const WORKERS = [
    'http://worker1:8080',
    'http://worker2:8080',
    'http://worker3:8080'
];

let currentIndex = 0;

const activeConnections = {
    'http://worker1:8080': 0,
    'http://worker2:8080': 0,
    'http://worker3:8080': 0
};

const WORKER_WEIGHTS = {
    'http://worker1:8080': 3,
    'http://worker2:8080': 2,
    'http://worker3:8080': 1
};

const weightedWorkers = [];
for (const [worker, weight] of Object.entries(WORKER_WEIGHTS)) {
    for (let i = 0; i < weight; i++) {
        weightedWorkers.push(worker);
    }
}
let weightedCurrentIndex = 0;

const httpAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 100,
});

const axiosClient = axios.create({
    httpAgent: httpAgent,
});

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash;
    }
    return Math.abs(hash);
}

app.get('/cal', async (req, res) => {
    const n = req.query.n || 5;
    const algo = req.query.algo || 'round-robin'; 
    
    let targetWorker = '';
    
    if (algo === 'random') {
        const randomIndex = Math.floor(Math.random() * WORKERS.length);
        targetWorker = WORKERS[randomIndex];
    } else if (algo === 'least-connection') {
        targetWorker = WORKERS.reduce((minWorker, worker) => 
            activeConnections[worker] < activeConnections[minWorker] ? worker : minWorker
        , WORKERS[0]);
    } else if (algo === 'hash') {
        const clientIp = req.ip || req.connection.remoteAddress;
        const hashValue = hashString(clientIp || 'default');
        targetWorker = WORKERS[hashValue % WORKERS.length];
    } else if (algo === 'weighted-round-robin') {
        targetWorker = weightedWorkers[weightedCurrentIndex];
        weightedCurrentIndex = (weightedCurrentIndex + 1) % weightedWorkers.length;
    } else {
        targetWorker = WORKERS[currentIndex];
        currentIndex = (currentIndex + 1) % WORKERS.length;
    }
    
    activeConnections[targetWorker]++;
    console.log(`[Manager] Routing request to ${targetWorker} (Algo: ${algo}, Active Conns: ${activeConnections[targetWorker]})`);
    
    try {
        const response = await axiosClient.get(`${targetWorker}/cal?n=${n}`);
        activeConnections[targetWorker]--;
        res.json({
            managerDetails: {
                algorithmUsed: algo,
                routedTo: targetWorker
            },
            workerResponse: response.data
        });
    } catch (error) {
        activeConnections[targetWorker]--;
        console.error(`[Manager] Error routing to ${targetWorker}:`, error.message);
        res.status(500).json({ error: 'Failed to contact worker', details: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Manager] Load Balancer Simulator listening on port ${PORT}`);
});
