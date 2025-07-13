export const swagger = {
    swagger: "2.0",
    info: {
        title: "TsLeetCodeExpress API",
        description: "API для управления пользователями и задачами",
        version: "1.0.0",
    },
    host: "localhost:8082",
    basePath: "/api",  // Базовый путь для всех эндпоинтов
    schemes: ["http"],
    paths: {
        "/users/id/{id}": {  // Полный путь: /api/users/id/{id}
            get: {
                tags: ["Users"],
                summary: "Получить пользователя по ID",
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    type: "integer",
                    format: "int64",
                    description: "ID пользователя"
                }],
                responses: {
                    200: {
                        description: "Успешный ответ",
                        schema: { $ref: "#/definitions/UserResponse" }
                    },
                    400: { description: "Неверный формат ID" },
                    404: { description: "Пользователь не найден" }
                }
            }
        },
        "/users/login/{login}": {
            get: {
                tags: ["Users"],
                summary: "Получить пользователя по логину",
                parameters: [{
                    name: "login",
                    in: "path",
                    required: true,
                    type: "string",
                    description: "Уникальный логин пользователя"
                }],
                responses: {
                    200: {
                        description: "Успешный ответ",
                        schema: { $ref: "#/definitions/UserResponse" }
                    },
                    404: { description: "Пользователь не найден" }
                }
            }
        },
        "/users/email/{email}": {
            get: {
                tags: ["Users"],
                summary: "Получить пользователя по email",
                parameters: [{
                    name: "email",
                    in: "path",
                    required: true,
                    type: "string",
                    format: "email",
                    description: "Email пользователя"
                }],
                responses: {
                    200: {
                        description: "Успешный ответ",
                        schema: { $ref: "#/definitions/UserResponse" }
                    },
                    400: { description: "Неверный формат email" },
                    404: { description: "Пользователь не найден" }
                }
            }
        },
        "/users/create": {
            post: {
                tags: ["Users"],
                summary: "Создать нового пользователя",
                parameters: [{
                    name: "request",
                    in: "body",
                    required: true,
                    schema: { $ref: "#/definitions/CreateUserRequest" }
                }],
                responses: {
                    201: {
                        description: "Пользователь создан",
                        schema: {
                            type: "integer",
                            format: "int64",
                            example: 1
                        }
                    },
                    400: { description: "Невалидные данные" },
                    409: { description: "Пользователь уже существует" }
                }
            }
        },
        "/users/update": {
            put: {
                tags: ["Users"],
                summary: "Обновить данные пользователя",
                parameters: [{
                    name: "request",
                    in: "body",
                    required: true,
                    schema: { $ref: "#/definitions/UpdateUserRequest" }
                }],
                responses: {
                    200: {
                        description: "Данные обновлены",
                        schema: { $ref: "#/definitions/UserResponse" }
                    },
                    400: { description: "Невалидные данные" },
                    404: { description: "Пользователь не найден" }
                }
            }
        },
        "/users/delete": {
            post: {
                tags: ["Users"],
                summary: "Удалить пользователя",
                parameters: [{
                    name: "request",
                    in: "body",
                    required: true,
                    schema: { $ref: "#/definitions/DeleteUserRequest" }
                }],
                responses: {
                    200: {
                        description: "Пользователь удален",
                        schema: {
                            type: "integer",
                            format: "int64",
                            example: 1
                        }
                    },
                    404: { description: "Пользователь не найден" }
                }
            }
        },
        "/users/changeActive": {
            patch: {
                tags: ["Users"],
                summary: "Изменить статус активности",
                parameters: [{
                    name: "request",
                    in: "body",
                    required: true,
                    schema: { $ref: "#/definitions/ChangeActiveRequest" }
                }],
                responses: {
                    200: {
                        description: "Статус изменен",
                        schema: { $ref: "#/definitions/UserResponse" }
                    },
                    404: { description: "Пользователь не найден" }
                }
            }
        }
    },
    definitions: {
        UserResponse: {
            type: "object",
            properties: {
                id: { type: "integer", format: "int64", example: 1 },
                login: { type: "string", example: "user123" },
                email: { type: "string", format: "email", example: "user@example.com" },
                createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z" },
                isActive: { type: "boolean", example: true }
            }
        },
        CreateUserRequest: {
            type: "object",
            required: ["login", "email", "passwordHash"],
            properties: {
                login: {
                    type: "string",
                    minLength: 3,
                    maxLength: 20,
                    example: "user123",
                    description: "Уникальный логин (3-20 символов)"
                },
                email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                    description: "Валидный email"
                },
                passwordHash: {
                    type: "string",
                    example: "5f4dcc3b5aa765d61d8327deb882cf99",
                    description: "Хеш пароля (MD5/SHA)"
                }
            }
        },
        UpdateUserRequest: {
            type: "object",
            required: ["id"],
            properties: {
                id: { type: "integer", format: "int64", example: 1 },
                newEmail: {
                    type: "string",
                    format: "email",
                    example: "new@example.com",
                    description: "Новый email"
                },
                newPasswordHash: {
                    type: "string",
                    example: "5f4dcc3b5aa765d61d8327deb882cf99",
                    description: "Новый хеш пароля"
                }
            }
        },
        DeleteUserRequest: {
            type: "object",
            required: ["id"],
            properties: {
                id: { type: "integer", format: "int64", example: 1 }
            }
        },
        ChangeActiveRequest: {
            type: "object",
            required: ["id", "isActive"],
            properties: {
                id: { type: "integer", format: "int64", example: 1 },
                isActive: {
                    type: "boolean",
                    example: false,
                    description: "Новый статус активности"
                }
            }
        }
    }
};