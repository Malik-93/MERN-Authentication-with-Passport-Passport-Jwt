const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = {
addProductValidation: (data) => {
data.title = isEmpty(data.title) ? data.title : '';
data.description = isEmpty(data.description) ? data.description : '';
data.company = isEmpty(data.company) ? data.company : '';
data.price = isEmpty(data.price) ? data.price : '';
data.productImage = isEmpty(data.productImage) ? data.productImage : '';
const errors = {}

if(Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required'
}
        if (Validator.isEmpty(data.description)) {
            errors.title = 'description field is required'
        }
        if (Validator.isEmpty(data.company)) {
            errors.title = 'company field is required'
        }

        if (Validator.isEmpty(data.price)) {
            errors.title = 'price field is required'
        }
        if (Validator.isEmpty(data.productImage)) {
            errors.title = 'productImage field is required'
        }

        return {
            errors,
            isValid = isEmpty(errors)
        }
}

}