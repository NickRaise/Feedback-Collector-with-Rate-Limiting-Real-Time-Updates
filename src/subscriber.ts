import { subscriber } from "./redis";

subscriber.subscribe("feedback-channel");

subscriber.on("message", (channel, msg) => {
  console.log(`Received Feedback -> ${msg} from channel ${channel}`);
});
