const globalErrorHandler = (err, req, res, next) => {

    res.status(500).json({
        status: 'error',
        error: err,
    })

};

module.exports={globalErrorHandler};