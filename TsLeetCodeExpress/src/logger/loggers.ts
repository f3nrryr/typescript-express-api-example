export interface ILogger {
    log(message: string, context?: Record<string, unknown>): void;
    error(message: string, error?: Error, context?: Record<string, unknown>): void;
}

export class ConsoleLogger implements ILogger {
    log(message: string, context?: Record<string, unknown>) {
        console.log(`[LOG] ${message}`, context || '');
    }

    error(message: string, error?: Error, context?: Record<string, unknown>) {
        console.error(`[ERROR] ${message}`, error, context || '');
    }
}



import { writeFileSync } from 'fs';
export class FileLogger implements ILogger {
    private readonly logFilePath: string;

    constructor(logFilePath: string = 'app.log') {
        this.logFilePath = logFilePath;
    }

    log(message: string, context?: Record<string, unknown>) {
        const logEntry = `[${new Date().toISOString()}] LOG: ${message} ${JSON.stringify(context || {})}\n`;
        writeFileSync(this.logFilePath, logEntry, { flag: 'a' });
    }

    error(message: string, error?: Error, context?: Record<string, unknown>) {
        const logEntry = `[${new Date().toISOString()}] ERROR: ${message} ${error?.stack || ''} ${JSON.stringify(context || {})}\n`;
        writeFileSync(this.logFilePath, logEntry, { flag: 'a' });
    }
}