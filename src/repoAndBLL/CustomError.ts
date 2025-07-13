export class CustomError extends Error {

    title: string;
    description: string;
    statusCode: number;
    stackTrace: string | null;

    constructor(title: string, description: string, statusCode: number, stackTrace: string | null) {

        super();

        this.title = title;
        this.description = description;
        this.statusCode = statusCode;
        this.stackTrace = stackTrace;

    }

}