const Validator = require('validatorjs');
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const validateBody = async (body, res, validationRule, operation) => {
    await validator(body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        }else{
            operation()
        }
    }).catch( err => console.log(err))
};
module.exports = {
    validator, 
    validateBody
};

