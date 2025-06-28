export class ChangeIsActiveUserRequest {
    id: number;
    isActive: boolean;

    constructor(id: number, isActive: boolean) {
        this.id = id;
        this.isActive = isActive;
    }
}