import Redis from "ioredis";

const redis = new Redis({
    port: 6379,
    host: '1.1.1.1',
    db: process.env.NODE_ENV==='prod'? 5 : 4,
    password: '11111'
});

export default redis
export { redis }

