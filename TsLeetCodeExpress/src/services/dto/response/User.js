"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, login, email, passwordHash, isActive, createdAt, solvedTasks = []) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.solvedTasks = solvedTasks;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map