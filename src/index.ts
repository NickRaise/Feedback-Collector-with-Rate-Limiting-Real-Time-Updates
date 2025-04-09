import express, { RequestHandler } from "express";
import { client, publisher } from "./redis";

const app = express();

app.use(express.json());

// User can only vote once every minute
const voteLimitingMiddleware: RequestHandler = async (req, res, next) => {
  const ip = req.ip;
  console.log("Received IP", ip)
  const key = `vote:${ip}`;
  const voteCount = await client.incr(key);
  if (voteCount == 1) {
    client.expire(key, 60);
    next();
  } else {
    res.send("Voting too fast bro! wait for 1 min");
  }
};

app.get("/", (req, res) => {
  res.send("server is working!" + req.ip);
});

app.post("/feedback", voteLimitingMiddleware, async (req, res) => {
  const { message } = req.body;
  console.log("Storing feedback")
  await client.lpush("feedbacks", message);
  await publisher.publish("feedback-channel", message);

  res.send("Feedback received! Send another one after a minute.");
});

app.get("/feedbacks", async (req, res) => {
  const feedbacks = await client.lrange("feedbacks", 0, 10);
  res.send(feedbacks)
});

app.listen(3000);
