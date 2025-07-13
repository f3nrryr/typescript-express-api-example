export class DataSourceInfoDTO {

    DbType: string
    DbHost: string
    DbPort: number
    DbUserName: string
    DbPassword: string
    DbName: string
    DbSynchronize: boolean
    DbLogging: boolean

    constructor(dbType: string, dbHost: string, dbPort: number, dbUserName: string, dbPassword: string,
        dbName: string, dbSynchronize: boolean, dbLogging: boolean) {
        this.DbType = dbType;
        this.DbHost = dbHost;
        this.DbPort = dbPort;
        this.DbUserName = dbUserName;
        this.DbPassword = dbPassword;
        this.DbName = dbName;
        this.DbSynchronize = dbSynchronize;
        this.DbLogging = dbLogging;
    }
}