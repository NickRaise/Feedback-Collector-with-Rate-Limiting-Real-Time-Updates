import Redis from "ioredis";

// new Redis() === new Redis("redis://127.0.0.1:6379");

export const client = new Redis()
export const publisher = new Redis()
export const subscriber = new Redis()