export class UpdateUserRequest {

    id: number;
    newEmail: string;
    newPasswordHash: string;

    constructor(id: number, newEmail: string, newPasswordHash: string) {
        this.id = id;
        this.newEmail = newEmail;
        this.newPasswordHash = newPasswordHash;
    }

}