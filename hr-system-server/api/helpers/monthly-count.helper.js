const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');
const { genericFunctionReturn, genericGetAll } = require('../services/generic.service');

const getAllMonthlyCounts = async (options = {}) => {
    try {
        const monthlyCounts = await genericGetAll('MonthlyCount', options);

        if (monthlyCounts.error) {
            return genericFunctionReturn(null, new APIError('0000', StatusCodes.BAD_REQUEST));
        }

        return monthlyCounts;

    } catch(error) {
        return genericFunctionReturn(null, new APIError('0000', StatusCodes.BAD_REQUEST));
    }
}

module.exports = {
    getAllMonthlyCounts
};
