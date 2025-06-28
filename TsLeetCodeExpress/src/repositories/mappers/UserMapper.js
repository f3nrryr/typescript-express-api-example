"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("../../repositories/dto/User");
const TaskMapper_1 = require("./TaskMapper");
class UserMapper {
    static toRepoLayer(user) {
        const userSolvedTasks = user.solvedTasks.map(TaskMapper_1.TaskMapper.toRepoLayer);
        return new User_1.User(user.id, user.login, user.email, user.passwordHash, user.isActive, user.createdAt, userSolvedTasks);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map