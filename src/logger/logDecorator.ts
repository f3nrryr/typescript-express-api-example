import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';
import { ILogger, ConsoleLogger } from './loggers';

export function LogRequestResponse(logger?: ILogger) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const startTime = performance.now();
            const usedLogger = logger || new ConsoleLogger(); // Fallback на ConsoleLogger, если DI не предоставил логгер

            // Логируем запрос
            usedLogger.log(`Incoming request: ${req.method} ${req.url}`, {
                headers: req.headers,
                body: req.body,
            });

            // Перехватываем ответ
            const originalSend = res.send;
            let responseBody: any;

            res.send = function (body?: any): Response {
                responseBody = body;
                return originalSend.call(this, body);
            };

            try {
                await originalMethod.call(this, req, res, next);

                // Логируем ответ
                const endTime = performance.now();
                const duration = (endTime - startTime).toFixed(2);

                usedLogger.log(`Request completed: ${req.method} ${req.url}`, {
                    status: res.statusCode,
                    response: responseBody,
                    duration: `${duration} ms`,
                });
            } catch (error) {
                usedLogger.error(`Request failed: ${req.method} ${req.url}`, error as Error, {
                    status: res.statusCode,
                });
                throw error;
            }
        };

        return descriptor;
    };
}