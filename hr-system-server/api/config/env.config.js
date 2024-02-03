require('dotenv').config();

const envVarNames = {
    string: [
        'NODE_ENV',
        'API_HOST',
        'API_VERSION',
        'PGSQL_DB',
        'PGSQL_HOST',
        'PGSQL_USER',
        'PGSQL_PASSWORD'
    ],
    int: [
        'API_PORT',
        "PGSQL_PORT"
    ]
};

let env = {};

Object.keys(envVarNames).forEach((type) => {
    switch(type) {
        case 'string': {
            envVarNames[type].forEach((elem) => {
                env[elem] = process.env[elem];
            });
            break;
        }

        case 'int': {
            envVarNames[type].forEach((elem) => {
                env[elem] = parseInt(process.env[elem]);
            });
            break;
        }

        default: break;
    }
});

module.exports = env;
