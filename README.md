# Load Balancer Simulator & Performance Benchmarking

A professional system architecture built with **Node.js** and **Docker** to simulate a distributed environment. This project implements and compares 5 different load balancing algorithms under high-stress conditions (10,000 concurrent requests).

## 🚀 Project Overview

The system is designed to distribute CPU-intensive tasks across multiple backend nodes. It evaluates how different algorithms handle heavy loads and manage system resources efficiently.

### System Architecture:
* **Load Balancer (Manager):** Orchestrates incoming traffic on Port `8090`.
* **Backend Nodes (Workers):** 3 Docker containers processing tasks on Port `8080`.
* **Orchestration:** Managed via `Docker Compose` for a seamless distributed environment.

---

## 🛠️ Folder Structure

* 📁 **load-balancer/**: Contains the source code for the Manager and Worker nodes.
* 📁 **Excel/**: Detailed benchmarking data and the master comparison sheet.
* 📁 **Photos/**: Screenshots of terminal logs, Docker status, and performance charts.
* 📁 **Report/**: The final academic report and documentation.

---

## 🧮 The Computational Task

Each worker executes a complex mathematical function to simulate real-world CPU load:

$$H(n) = \sum_{i=1}^{n \times 10^6} \frac{\sqrt{i}\sin(i)}{\ln(i+1)}$$

---

## 📊 Benchmarking Results (10,000 Requests)

We tested 10,000 requests with a concurrency level of 200. Here are the **exact** findings from our benchmarking:

| Algorithm | Avg Response Time (ms) | Min Time (ms) | Max Time (ms) |
| :--- | :--- | :--- | :--- |
| **Random** | 41,689.58 | 12 | 161,784 |
| **Least Connection** | 42,113.87 | 606 | 111,809 |
| **Round Robin** | 42,917.15 | 12 | 124,134 |
| **Weighted RR** | 63,907.82 | 7 | 204,439 |
| **IP Hash** | 128,314.52 | 635 | 584,448 |

> **💡 Key Engineering Insights:**
> * **Best Stability:** **Least Connection** outperformed all others in stability, maintaining the **lowest Max Latency (111,809 ms)**, which effectively prevented server bottlenecks.
> * **Session Persistence Proof:** **IP Hash** recorded a significantly higher average and max time. This confirms that all 10,000 requests were successfully pinned to a single worker based on the client IP, demonstrating correct session persistence logic.
> * **Efficiency:** **Random** showed a fast average but high variance (Max Time), making it less predictable than **Round Robin**.

---

## 🐳 Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/load-balancer-sim.git](https://github.com/your-username/load-balancer-sim.git)
    ```
2.  **Run the System:**
    ```bash
    docker-compose up --build
    ```
3.  **Execute Stress Test:**
    ```bash
    ab -n 10000 -c 200 "http://localhost:8090/cal?n=5&algo=least-connection"
    ```

---

## 👨‍💻 Author
**Seif Eldin Mohamed**
*Computer Science Student at Zagazig University | Full Stack Developer*
[LinkedIn](https://www.linkedin.com/in/your-profile) | [Portfolio](https://seif-dev.vercel.app)
