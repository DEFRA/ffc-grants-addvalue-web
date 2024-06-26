const cookie = require('@hapi/cookie')
const authConfig = require('../../../app/config/auth')
const urlPrefix = require('../../../app/config/server').urlPrefix
const auth = require('../../../app/plugins/auth');

jest.mock('../../../app/server', () => {
    return jest.fn().mockImplementation(() => {
        return {
            register: jest.fn(),
            start: () => { },
            stop: () => { },
            route: () => { },
            views: () => { },
            info: {
                created: 1666795964619,
                host: "mock-host",
                id: "mock-host:18:id",
                port: 3600,
                protocol: "http",
                started: 0,
                uri: "http://localhost:3600",
            },
        }
    })
});


jest.mock('@hapi/cookie');
jest.mock('../../../app/config/auth', () => ({
    cookie: 'cookie',
    credentials: {
        username: 'username',
        password: 'password',
    }
}));
jest.mock('../../../app/config/server', () => ({
    urlPrefix: 'urlPrefix',
    cookieOptions: {
        isSecure: true,
    }
    }));


describe('auth', () => {
    it('should have a name property', () => {
        expect(auth.plugin.name).toEqual('auth');
    });

    it('should register the auth plugin', async () => {
        const server = {
            register: jest.fn(),
            auth: {
                strategy: jest.fn(),
                default: jest.fn()
            }
        };

        await auth.plugin.register(server);

        expect(server.register).toHaveBeenCalledWith(cookie);
        expect(server.auth.strategy).toHaveBeenCalledWith('session-auth', 'cookie', {
            cookie: authConfig.cookie,
            redirectTo: `${urlPrefix}/login`,
            validateFunc: expect.any(Function)
        });
        expect(server.auth.default).toHaveBeenCalledWith('session-auth');
    });

    it('should validate the session correctly', async () => {
        const server = {
            register: jest.fn(),
            auth: {
            strategy: jest.fn(),
            default: jest.fn()
            }
        };
    
        await auth.plugin.register(server, {});
    
        // Call the validateFunc with a session that is authenticated
        const validateFunc = server.auth.strategy.mock.calls[0][2].validateFunc;
        const { valid, credentials } = validateFunc({}, { authenticated: true });
    
        expect(valid).toBe(true);
        expect(credentials).toEqual(authConfig.credentials);
    
        // Call the validateFunc with a session that is not authenticated
        const { valid: validNotAuthenticated } = validateFunc({}, { authenticated: false });
    
        expect(validNotAuthenticated).toBe(false);
    });
});
