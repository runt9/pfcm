var config = {
    express: {
        port: 8585,
        ip: "127.0.0.1"
    },
    
    db: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            user: "pfcm",
            password: "pfcmpass",
            database: "runt9"
        }
    },

    logging: {
        debug: true
    }
};

module.exports = config;