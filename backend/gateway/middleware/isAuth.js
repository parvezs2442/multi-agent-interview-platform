import redis from "../../shared/redis/redis.js";

export const isAuth = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        status: false,
        message: "Session Expired",
      });
    }

    req.user = JSON.parse(session);

    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};