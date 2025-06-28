"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const TaskMapper_1 = require("./TaskMapper");
const User_1 = require("../../services/dto/User");
const User_2 = require("../contractsDTOs/User");
class UserMapper {
    static toApi(user) {
        const userSolvedTasks = user.solvedTasks.map(TaskMapper_1.TaskMapper.toApi);
        return new User_2.User(user.id, user.login, user.email, user.passwordHash, user.isActive, user.createdAt, userSolvedTasks);
    }
    static toBLL(user) {
        const userSolvedTasks = user.solvedTasks.map(TaskMapper_1.TaskMapper.toBLL);
        return new User_1.User(user.id, user.login, user.email, user.passwordHash, user.isActive, user.createdAt, userSolvedTasks);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map