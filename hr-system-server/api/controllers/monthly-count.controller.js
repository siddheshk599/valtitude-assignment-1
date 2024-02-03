const { StatusCodes } = require('http-status-codes');
const { getAllMonthlyCounts } = require("../helpers/monthly-count.helper");

const getAllMonthlyCountsCntrl = async (req, res, next) => {
    try {
        if (req.query['from'] && req.query['to']) {
            let startDate = new Date(req.query['from']);
            let endDate = new Date(req.query['to']);
            endDate.setHours(23, 0, 0);

            req.query['monthOfYear'] = {
                [db.Sequelize.Op.gte]: startDate,
                [db.Sequelize.Op.lte]: endDate
            };

            delete req.query.from;
            delete req.query.to;
        }

        let monthlyCounts = await getAllMonthlyCounts({
            where: [req.query],
            order: [['monthOfYear', 'ASC']],
            include: [
                {
                    model: db['Role'],
                    as: 'role',
                    include: ['department'],
                    attributes: {
                        exclude: ['departmentId']
                    }
                }
            ],
            attributes: {
                exclude: ['roleId']
            }
        });

        if (monthlyCounts.error) {
            return next(monthlyCounts.error);
        }

        res.status(StatusCodes.OK).json({
            error: null,
            data: monthlyCounts.data
        });

    } catch(error) {
        next(error);
    }
}

module.exports = {
    getAllMonthlyCountsCntrl
};
