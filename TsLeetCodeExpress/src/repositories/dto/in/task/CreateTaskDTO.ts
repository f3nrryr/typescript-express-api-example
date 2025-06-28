export class CreateTaskDTO {
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