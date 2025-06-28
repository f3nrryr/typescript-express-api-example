export class UpdateTaskRequest {
    id: number;
    title: string;
    description: string;
    taskComplexityId: number;
    isVisible: boolean;

    constructor(id: number, title: string, description: string, taskComplexityId: number, isVisible: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.taskComplexityId = taskComplexityId;
        this.isVisible = isVisible;
    }
}