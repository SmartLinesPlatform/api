import AppError from "@errors/AppError";
import { Request, Response, NextFunction } from "express";

export default function GlobalErrorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "Error",
    message: "Internal server error",
  });
}
