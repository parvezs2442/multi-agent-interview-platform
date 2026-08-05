import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../model/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

export const GoogleAuth = async (req, res) => {
  console.log("1. Controller entered");

  try {
    const { token } = req.body;
    console.log("2. Token received");

    const decoded = await getAuth(app).verifyIdToken(token);
    console.log("3. Token verified");

    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });
    console.log("4. User checked");

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
      });
      console.log("5. User created");
    }

    console.log("6. Before Redis");

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({ userId: user._id }),
      "EX",
      604800,
    );

    console.log("7. Redis Done");

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 604800000,
    });

    console.log("8. Sending response");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }
    res.clearCookie("session");

    return res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Logout Failed",
    });
  }
};
