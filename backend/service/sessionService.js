import Session from "../models/Session.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const enforceSessionLimit = async (userId) => {
  const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 5;
//   console.log(userId, "User id");

  const sessions = await Session.find({ userId }).sort({
    createdAt: 1,
  });

//   console.log(sessions, "Sessions...");

  if (sessions.length >= MAX_SESSIONS) {
    const sessionsToDelete = sessions.slice(
      0,
      sessions.length - MAX_SESSIONS + 1
    );

    for (const session of sessionsToDelete) {
      await Session.deleteOne({ _id: session._id });
    }
  }
};

export const createSession = async (userId, refreshToken, device) => {
    // console.log(userId, 'User id in create session');
    // console.log(refreshToken, 'refreshTokin in crate session');
    // console.log(device);
    
    
  const hashedToken = await bcrypt.hash(refreshToken, 10);

  return await Session.create({
    userId,
    refreshToken: hashedToken,
    device,
  });
};

export const findValidationSession = async (userId, refreshToken) => {
  const sessions = await Session.find({ userId });

  for (const session of sessions) {
    const isValid = await bcrypt.compare(refreshToken, session.refreshToken);

    if (isValid) {
      return session;
    }
  }

  return null;
};

export const rotateRefreshToken = async (session, newToken) => {
  const hashedToken = await bcrypt.hash(newToken, 10);

  session.refreshToken = hashedToken;
  await session.save();
};

export const deleteSession = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
