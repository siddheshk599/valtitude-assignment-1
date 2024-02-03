const { StatusCodes } = require('http-status-codes');
const { getAllRoles } = require("../helpers/role.helper");

const getAllRolesCntrl = async (req, res, next) => {
    try {
        const roles = await getAllRoles();

        if (roles.error) {
            return next(roles.error);
        }

        res.status(StatusCodes.OK).json({
            error: null,
            data: roles.data
        });

    } catch(error) {
        next(error);
    }
}

module.exports = {
    getAllRolesCntrl
};
