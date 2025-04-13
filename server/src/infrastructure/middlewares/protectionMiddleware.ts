import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many login attempts, try agin later ",
  },
  standardHeaders: true,
  legacyHeaders: false,
});



export const otpRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // limit each IP to 3 OTP requests per window
  message: {
    status: 429,
    error: "Too many OTP requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
})