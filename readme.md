# 🗳️ Feedback Collector with Rate Limiting & Real-Time Updates

A simple Express.js app that allows users to submit feedback with the following features:

- 📤 Stores feedback in Redis using lists
- 🔄 Real-time feedback updates using Redis Pub/Sub
- ⏱️ Rate limiting based on IP (1 feedback per minute)

---

## 🚀 Features

- **Express.js** based API
- **Redis Lists** to store feedback
- **Redis Pub/Sub** for real-time communication
- **Rate Limiting** using `INCR` and `EXPIRE` per IP
- Clean and modular codebase

---

## 📦 Tech Stack

- Node.js
- Express.js
- TypeScript
- Redis
- ioredis

---

## 🧠 How It Works

### 1. Submit Feedback

```http
POST /feedback
Body: { "message": "your feedback here" }
```

- Stores feedback in a Redis list (`LPUSH`)

- Publishes feedback to a Redis channel (`PUBLISH`)

- Restricts one submission per IP per minute

### 2. View Feedbacks
```
GET /feedbacks
```

- Retrieves the latest 10 feedback entries from Redis

### 3. Real-Time Listener
- A Redis `SUBSCRIBE` listener prints feedbacks as they arrive in real-time

### 🚦 Rate Limiting Logic
- Uses Redis key per IP: `vote:<ip>`

- On feedback:

    - If first-time or expired → Accept and set EXPIRE to 60s

    - Else → Reject with 429 Too Many Requests

