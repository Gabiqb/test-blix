/* eslint-disable no-unused-vars */
// TODO: cp - check if we need this
export enum StatusType {
    Active = 'active',
    Pending = 'pending',
    ReadOnly = 'read-only',
}

export class GlobalConfig {
    static config: {
        clientPublicIp: string
        authority: {
            name: string
            company: string
            domain: string
            email: string
            logo: string
            phone: string
        }
        env: string
        time: { utc: string }
        api: {
            name: string
            port: number
        }
        client_domain: string
        server_domain: string
        version: string
        exposeTo: string
        cookie: {
            name: string
            secret: string
            maxAge: number
            secure: boolean
        }
        providers: {
            database: {
                uri: string
                status?: string
            }
            email: {
                smtp: {
                    secure: boolean
                    server: string
                    port: number
                    username: string
                    password: string
                }
            }
        }

        log: {
            level: string
            toJSON: boolean
            handleExceptions: boolean
        }
        mobile: {
            ios_store: string
            android_store: string
        }
        ModelsLoaded: boolean
    } = {
        authority: {
            name: 'scoreuapp',
            company: 'scoreuapp Swiss',
            domain: 'scoreuapp.swiss',
            email: 'hello@scoreuapp.swiss',
            // email: 'noreply@mednetpatient.swiss',
            logo: 'https://openmedical.swiss/img/openmedical_logo.jpg',
            phone: '+410615617461',
        },

        env: 'development',

        time: {
            utc: 'UTC', // server UTC offset
        },

        api: {
            name: 'Score U API',
            port: 3001,
        },

        client_domain: 'http://localhost:3000',
        server_domain: 'http://localhost:3001',
        // server_domain: 'http://192.168.100.3:3001',
        version: 'v1',
        exposeTo: 'localhost',
        // exposeTo: '192.168.100.3',
        cookie: {
            name: 'scoreudev',
            secret: 'Score U DEV App for athletes',
            maxAge: 10 * 24 * 60 * 60 * 1000,
            secure: true,
        },

        providers: {
            database: {
                uri: 'mongodb://localhost:27017/mednetsports',
                status: 'not_connected',
            },
            email: {
                smtp: {
                    // server: 'mail2.openmedical.loc',
                    server: 'scoreuapp-swiss.mail.protection.outlook.com',
                    port: 25,
                    username: '',
                    password: '',
                    secure: false,
                },
            },
        },

        log: {
            level: 'debug',
            toJSON: false,
            handleExceptions: true,
        },

        mobile: {
            ios_store: 'https://apps.apple.com/us/app/scoreuapp/id1572619425',
            android_store: 'https://play.google.com/store/apps/details?id=swiss.novcom.sportsindex',
        },
        clientPublicIp: '',
        ModelsLoaded: false,
    }

    static resolveClientDomain(): string {
        if (Array.isArray(GlobalConfig.config.client_domain)) {
            return GlobalConfig.config.client_domain[0]
        }

        return GlobalConfig.config.client_domain
    }
}
