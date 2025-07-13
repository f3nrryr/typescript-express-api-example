import { performance } from 'perf_hooks';
import { ILogger, ConsoleLogger } from './loggers';
import { Request, Response, NextFunction } from 'express';

export function LogRequestResponse(target: any, propertyKey: string, descriptor: PropertyDescriptor, logger?: ILogger) {

    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {

        const startLabel = performance.now();
        const usedLogger = logger || new ConsoleLogger();

        try {
            const result = await originalMethod.call(this, req, res, next);

            const endLabel = performance.now();
            const duration = (endLabel - startLabel).toFixed(2);

            usedLogger.log(propertyKey, req.path, req.body, result, Number(duration));

            return result;

        } catch (exception) {
            const endLabel = performance.now();
            const duration = (endLabel - startLabel).toFixed(2);
            usedLogger.error(propertyKey, req.path, req.body, Number(duration), exception as Error);
            throw exception;
        }
    };

    return descriptor;

}