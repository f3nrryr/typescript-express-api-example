export class ChangeTaskVisibilityRequest {
    id: number;
    isVisible: boolean;

    constructor(id: number, isVisible: boolean) {
        this.id = id;
        this.isVisible = isVisible;
    }

}