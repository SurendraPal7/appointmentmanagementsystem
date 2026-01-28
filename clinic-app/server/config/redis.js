// // /config/redis.js
// const Redis = require('ioredis');

// let redis;

// function createFallbackRedis() {
//   return {
//     get: async () => null,
//     set: async () => null,
//     del: async () => null
//   };
// }

// try {
//   const redisUrl = process.env.REDIS_URL;

//   if (!redisUrl || redisUrl === "hostname" || redisUrl === "") {
//     console.log("⚠️  REDIS_URL not set or invalid — Redis disabled.");
//     redis = createFallbackRedis();
//   } else {
//     redis = new Redis(redisUrl);

//     redis.on("connect", () => {
//       console.log("✅ Redis connected");
//     });

//     redis.on("error", (err) => {
//       console.error("❌ Redis error:", err.message);
//     });
//   }
// } catch (err) {
//   console.error("❌ Failed to initialize Redis:", err.message);
//   redis = createFallbackRedis();
// }

// module.exports = redis;
