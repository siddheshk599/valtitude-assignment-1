const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');
const { genericFunctionReturn, genericGetAll } = require('../services/generic.service');

const getAllRoles = async (options = {}) => {
    try {
        const roles = await genericGetAll('Role', options);

        if (roles.error) {
            return genericFunctionReturn(null, new APIError('0000', StatusCodes.BAD_REQUEST));
        }

        return roles;

    } catch(error) {
        return genericFunctionReturn(null, new APIError('0000', StatusCodes.BAD_REQUEST));
    }
}

module.exports = {
    getAllRoles
};
