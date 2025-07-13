import { DataSource } from "typeorm";
import { HealthIndicator, ResourceHealth } from "./health-indicator";
import { inject } from "inversify";

export class DbHealthCheck extends HealthIndicator {

    name: string = 'DB';

    constructor(@inject('DataSource') private _appDataSource: DataSource) {
        super();
    }

    async checkHealth(): Promise<void> {
        try {

            await this._appDataSource.manager.query("SELECT 1");

            this.status = ResourceHealth.Healthy;

        } catch (e) {

            // Type guard to check if it's an Error
            if (e instanceof Error) {
                this.details = e.message;
                console.log(`HEALTH: ${this.name} is unhealthy.`, e.message);
            } else {
                // Handle cases where it's not an Error object
                this.details = 'Unknown error occurred';
            }
        }
    }
}