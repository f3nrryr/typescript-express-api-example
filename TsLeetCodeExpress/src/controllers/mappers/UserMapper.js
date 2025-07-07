"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const TaskMapper_1 = require("./TaskMapper");
const User_1 = require("../contractsDTOs/res/User");
class UserMapper {
    static toApi(user) {
        var _a;
        const userSolvedTasks = (_a = user.solvedTasks) === null || _a === void 0 ? void 0 : _a.map(TaskMapper_1.TaskMapper.toApi);
        return new User_1.User(user.id, user.login, user.email, user.isActive, user.createdAt, userSolvedTasks);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map