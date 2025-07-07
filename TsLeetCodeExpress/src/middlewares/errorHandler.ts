import { Request, Response, NextFunction } from "express";
import { CustomError } from "../repoAndBLL/CustomError";

export const errorHandler = (err: any,
    req: Request,
    response: Response,
    next: NextFunction) => {

    if (err instanceof CustomError) {
        response.status(err.statusCode).json({
            title: err.title,
            description: err.description,
            statusCode: err.statusCode,
            stackTrace: err.stackTrace
        });
    }

    response.status(500).json({
        title: 'Ошибка сервера',
        description: err.message,
        statusCode: 500,
        stackTrace: err.stack
    });
};