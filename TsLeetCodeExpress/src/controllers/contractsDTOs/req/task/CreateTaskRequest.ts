export class CreateTaskRequest {
    title: string;
    description: string;
    taskComplexityId: number;
    isVisible: boolean;

    constructor(title: string, description: string, taskComplexityId: number, isVisible: boolean) {
        this.title = title;
        this.description = description;
        this.taskComplexityId = taskComplexityId;
        this.isVisible = isVisible;
    }
}