"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
exports.swagger = {
    swagger: "2.0",
    info: {
        title: "TsLeetCodeExpress API",
        description: "Учебный проект",
        version: "1.0.0",
    },
    host: "localhost:8082",
    basePath: "/",
    schemes: ["http"],
    paths: {
        "/users/{id}": {
            get: {
                description: "Get user by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "int32"
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    },
                    404: {
                        description: "Not Found"
                    }
                }
            }
        },
        "/users/{login}": {
            get: {
                description: "Get user by login",
                parameters: [
                    {
                        name: "login",
                        in: "path",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    },
                    404: {
                        description: "Not Found"
                    }
                }
            }
        },
        "/users/{email}": {
            get: {
                description: "Get user by email",
                parameters: [
                    {
                        name: "email",
                        in: "path",
                        required: true,
                        type: "string",
                        format: "email"
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    },
                    404: {
                        description: "Not Found"
                    }
                }
            }
        },
        "/users/create": {
            post: {
                description: "Create a new user",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            $ref: "#/definitions/CreateUserRequest"
                        }
                    }
                ],
                responses: {
                    201: {
                        description: "Created",
                        schema: {
                            type: "number",
                            format: "int32",
                            description: "ID of the created user"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    }
                }
            }
        },
        "/users/isActive": {
            post: {
                description: "Change user active status",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            $ref: "#/definitions/ChangeIsActiveUserRequest"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            type: "number",
                            format: "int32",
                            description: "ID of the updated user"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    }
                }
            }
        },
        "/users": {
            put: {
                description: "Update user information",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            $ref: "#/definitions/UpdateUserRequest"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            $ref: "#/definitions/User"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    }
                }
            },
            delete: {
                description: "Delete a user",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            $ref: "#/definitions/DeleteUserRequest"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        schema: {
                            type: "number",
                            format: "int32",
                            description: "ID of the deleted user"
                        }
                    },
                    400: {
                        description: "Bad Request"
                    }
                }
            }
        }
    },
    definitions: {
        User: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    format: "int32"
                },
                login: {
                    type: "string"
                },
                email: {
                    type: "string",
                    format: "email"
                },
                passwordHash: {
                    type: "string"
                },
                createdAt: {
                    type: "string",
                    format: "date-time"
                },
                isActive: {
                    type: "boolean"
                },
                solvedTasks: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Task"
                    }
                }
            }
        },
        Task: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    format: "int32"
                },
                title: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                createdAt: {
                    type: "string",
                    format: "date-time"
                },
                isVisible: {
                    type: "boolean"
                },
                solvedBy: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/User"
                    }
                }
            }
        },
        CreateUserRequest: {
            type: "object",
            properties: {
                login: {
                    type: "string",
                    example: "user123"
                },
                email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com"
                },
                passwordHash: {
                    type: "string",
                    example: "hashed_password_string"
                }
            },
            required: ["login", "email", "passwordHash"]
        },
        UpdateUserRequest: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    format: "int32",
                    example: 1
                },
                newEmail: {
                    type: "string",
                    format: "email",
                    example: "newemail@example.com"
                },
                newPasswordHash: {
                    type: "string",
                    example: "new_hashed_password_string"
                }
            },
            required: ["id"]
        },
        DeleteUserRequest: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    format: "int32",
                    example: 1
                }
            },
            required: ["id"]
        },
        ChangeIsActiveUserRequest: {
            type: "object",
            properties: {
                id: {
                    type: "number",
                    format: "int32",
                    example: 1
                },
                isActive: {
                    type: "boolean",
                    example: false
                }
            },
            required: ["id", "isActive"]
        }
    }
};
//# sourceMappingURL=swagger.js.map