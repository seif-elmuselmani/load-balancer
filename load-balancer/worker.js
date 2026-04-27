const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const WORKER_ID = process.env.WORKER_ID || 'worker-unknown';

const requestQueue = [];
let isProcessing = false;

function processQueue() {
    if (requestQueue.length === 0) {
        isProcessing = false;
        return;
    }

    isProcessing = true;
    
    const { n, res } = requestQueue.shift();
    const iterations = n * 1000000;
    
    console.log(`[${WORKER_ID}] Started processing request for n=${n}. current queue length: ${requestQueue.length}`);
    const start = Date.now();
    
    let result = 0;
    for (let i = 1; i <= iterations; i++) {
        result += (Math.sqrt(i) * Math.sin(i)) / Math.log(i + 1);
    }
    
    const end = Date.now();
    const duration = end - start;
    console.log(`[${WORKER_ID}] Finished processing in ${duration}ms`);
    
    res.json({
        workerId: WORKER_ID,
        result: result,
        durationMs: duration,
        queueLength: requestQueue.length
    });

    setImmediate(processQueue);
}

app.get('/cal', (req, res) => {
    const n = parseInt(req.query.n) || 5;
    
    requestQueue.push({ n, res });
    
    if (!isProcessing) {
        processQueue();
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[${WORKER_ID}] Worker listening on port ${PORT}`);
});
