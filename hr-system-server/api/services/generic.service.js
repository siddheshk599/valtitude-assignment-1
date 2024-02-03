const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');
const db = require('../models');

/**
 * @function genericFunctionReturn
 * @description Generic function return format
 * @param {*} data Data (should be null if error is present)
 * @param {*} error Error (should be null if data is present)
 * @returns {{ data: any, error: any }} Generic function return
 */
const genericFunctionReturn = (data, error) => {
    let returnObj = { data: null, error: null };

    try {
        returnObj.data = data;
        returnObj.error = error;

    } catch(error) {
        console.error(error);

    } finally {
        return returnObj;
    }
}

/**
 * @function genericGetAll
 * @description To get all data row(s) from a DB table.
 * @param {string} modelName Model name.
 * @param {Object} options Options.
 * @returns {{ data: any, error: any }} Data or Error.
 */
const genericGetAll = async (modelName, options) => {
    try {
        if (options == undefined || options == null || options == {}) {
            return genericFunctionReturn(null, new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR));
        }

        const result = await db[modelName].findAll({
            ...options
        });

        if (result instanceof Error) {
            return genericFunctionReturn(null, new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR));
        }

        return genericFunctionReturn(result, null);

    } catch(error) {
        return genericFunctionReturn(null, new APIError('0000', StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

module.exports = {
    genericFunctionReturn,
    genericGetAll
};
