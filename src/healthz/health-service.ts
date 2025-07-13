import { HealthIndicator, ResourceHealth } from "./health-indicator";

export class HealthService {
    private readonly checks: HealthIndicator[];
    public overallHealth: ResourceHealth = ResourceHealth.Healthy;

    constructor(checks: HealthIndicator[]) {
        this.checks = checks;
    }

    async getHealth(): Promise<HealthCheckResult> {
        await Promise.all(
            this.checks.map(check => check.checkHealth())
        );

        const anyUnhealthy = this.checks.some(item =>
            item.status === ResourceHealth.Unhealthy
        );
        this.overallHealth = anyUnhealthy
            ? ResourceHealth.Unhealthy
            : ResourceHealth.Healthy;

        // Create a simplified response without circular references
        const results = this.checks.map(check => ({
            name: check.name,
            status: check.status,
            details: check.details
        }));

        return {
            status: this.overallHealth,
            results
        };
    }
}

type HealthCheckResult = {
    status: ResourceHealth,
    results: Array<{
        name: string,
        status: ResourceHealth,
        details?: string
    }>
};