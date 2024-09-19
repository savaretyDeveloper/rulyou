/**
 * Centralized error handling middleware.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const errorHandler = (err, req, res) => {
    res.status(err.code).send({result: {error: err.message || err.name}});
};

module.exports = errorHandler;
