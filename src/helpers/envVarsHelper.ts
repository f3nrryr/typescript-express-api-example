import { config } from "dotenv";
import path from "path";

// Загружаем .env сразу при импорте
config({ path: path.resolve(__dirname, '../../../.env') });  // Путь относительно расположения файла

export class EnvVarsHelper {
    private static readonly envVars = {
        port: process.env.PORT || "5001",
        host: process.env.HOST || "localhost",
        ssl: process.env.SSL === "true" ? "https" : "http",
        nodeEnv: process.env.NODE_ENV as "development" | "production",
        dbType: process.env.DB_TYPE || "postgres",
        dbHost: process.env.DB_HOST || "localhost",
        dbPort: process.env.DB_PORT || "5432",
        dbUserName: process.env.DB_USERNAME || "postgres",
        dbPassword: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        dbSynchronize: process.env.DB_SYNCHRONIZE || "false",
        dbLogging: process.env.DB_LOGGING || "false"
    };

    public static getEnv(varName: keyof typeof EnvVarsHelper.envVars): string {
        const value = this.envVars[varName];
        if (!value) throw new Error(`Env var ${varName} is not defined`);
        return value;
    }
}