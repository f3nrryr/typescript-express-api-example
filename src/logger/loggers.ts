export interface ILogger {
    log(methodName: string, path: string, body: string, result: any, durationMs: number): void;
    error(methodName: string, path: string, body: string, durationMs: number, error?: Error): void;
}

export class ConsoleLogger implements ILogger {
    log(methodName: string, path: string, body: string, result: any, durationMs: number) {
        console.log(`\n[LOG] ${new Date()} ${methodName}. path: ${path}, body: ${body}. RESULT: ${result}. Duration: ${durationMs}ms\n`);
    }

    error(methodName: string, path: string, body: string, durationMs: number, error: Error) {
        console.error(`\n[ERROR] ${new Date()} ${methodName}. path: ${path}, body: ${body}. Exception: ${JSON.stringify(error)}. Duration: ${durationMs}ms\n`);
    }
}



import { writeFileSync } from 'fs';
export class FileLogger implements ILogger {
    private readonly logFilePath: string;

    constructor(logFilePath: string = 'app.log') {
        this.logFilePath = logFilePath;
    }

    log(methodName: string, path: string, body: string, result: any, durationMs: number) {
        const logEntry = `\n[LOG] ${new Date().toISOString()} ${methodName}. path: ${path}, body: ${body}. RESULT: ${JSON.stringify(result)}. Duration: ${durationMs}ms\n`;
        writeFileSync(this.logFilePath, logEntry, { flag: 'a' });
    }

    error(methodName: string, path: string, body: string, durationMs: number, error: Error) {
        const logEntry = `\n[ERROR] ${new Date().toISOString()} ${methodName} . path: ${path}, body: ${body}. Exception: ${JSON.stringify(error)}. Duration: ${durationMs}ms\nStack: ${error?.stack || 'no stack trace'}\n`;
        writeFileSync(this.logFilePath, logEntry, { flag: 'a' });
    }
}