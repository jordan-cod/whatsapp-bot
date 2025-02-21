import { Request, Response, NextFunction } from "express";
import { z } from "zod";

interface ValidationError {
    status: "error";
    message: string;
    errors: { field: string; message: string }[];
}

interface GeneralError {
    status: "error";
    message: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function errorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response<ValidationError | GeneralError> {
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            status: "error",
            message: "Validation error",
            errors: error.errors.map((error) => ({
                field: error.path.join("."),
                message: error.message
            }))
        });
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred."
    });
}
