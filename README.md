\# Load Balancer Simulator \& Performance Benchmarking



A professional system architecture built with \*\*Node.js\*\* and \*\*Docker\*\* to simulate a distributed environment. This project implements and compares 5 different load balancing algorithms under high-stress conditions (10,000 concurrent requests).



\## 🚀 Project Overview



The system is designed to distribute CPU-intensive tasks across multiple backend nodes. It evaluates how different algorithms handle heavy loads and manage system resources efficiently.



\### System Architecture:

\* \*\*Load Balancer (Manager):\*\* Orchestrates incoming traffic on Port `8090`.

\* \*\*Backend Nodes (Workers):\*\* 3 Docker containers processing tasks on Port `8080`.

\* \*\*Orchestration:\*\* Managed via `Docker Compose` for a seamless distributed environment.



\---



\## 🛠️ Folder Structure



Based on the project organization:

\* 📁 \*\*load-balancer/\*\*: Contains the source code for the Manager and Worker nodes.

\* 📁 \*\*Excel/\*\*: Detailed benchmarking data and the master comparison sheet.

\* 📁 \*\*Photos/\*\*: Screenshots of terminal logs, Docker status, and performance charts.

\* 📁 \*\*Report/\*\*: The final academic report and documentation.



\---



\## 🧮 The Computational Task



Each worker executes a complex mathematical function to simulate real-world CPU load:



$$H(n) = \\sum\_{i=1}^{n \\times 10^6} \\frac{\\sqrt{i}\\sin(i)}{\\ln(i+1)}$$



\---



\## 📊 Benchmarking Results



We tested 10,000 requests with a concurrency level of 200. Here is the summary of our findings:



| Algorithm | Avg Response Time (ms) | Min Time (ms) | Max Time (ms) |

| :--- | :--- | :--- | :--- |

| \*\*Least Connection\*\* | 42,113.86 | 16 | 118,090 |

| \*\*Round Robin\*\* | 42,917.14 | 12 | 124,134 |

| \*\*Random\*\* | 41,689.58 | 12 | 161,784 |

| \*\*Weighted RR\*\* | 63,907.81 | 7 | 204,439 |

| \*\*IP Hash\*\* | 128,314.51 | 355 | 844,448 |



> \*\*Key Insight:\*\* \*\*Least Connection\*\* provided the best stability (lowest Max Latency), while \*\*IP Hash\*\* successfully demonstrated Session Persistence by pinning all requests to a single node.



\---



\## 🐳 Getting Started



1\.  \*\*Clone the Repository:\*\*

&#x20;   ```bash

&#x20;   git clone \[https://github.com/your-username/load-balancer-sim.git](https://github.com/your-username/load-balancer-sim.git)

&#x20;   ```

2\.  \*\*Run the System:\*\*

&#x20;   ```bash

&#x20;   docker-compose up --build

&#x20;   ```

3\.  \*\*Execute Stress Test:\*\*

&#x20;   ```bash

&#x20;   ab -n 10000 -c 200 "http://localhost:8090/cal?n=5\&algo=least-connection"

&#x20;   ```



\---



\## 👨‍💻 Author

\*\*Seif Eldin Mohamed\*\*

\*Computer Science Student at Zagazig University | Full Stack Developer\*

\[LinkedIn](https://www.linkedin.com/in/your-profile) | \[Portfolio](https://seif-dev.vercel.app)

