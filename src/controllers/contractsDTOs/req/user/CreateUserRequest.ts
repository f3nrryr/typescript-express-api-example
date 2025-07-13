export class CreateUserRequest {

    login: string;
    email: string;
    passwordHash: string;

    constructor(login: string, email: string, passwordHash: string) {
        this.login = login;
        this.email = email
        this.passwordHash = passwordHash;
    }

}