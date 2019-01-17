const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = (server) => {
    //Get customer
    server.get('/customers', async (req, res, next) => {
        try {
            const customers = await Customer.find();
            res.send(customers);
            next();
        } catch(err) {
            return next(new errors.InvalidContentError(err));
        }
        
    });

    //Get single customer
    server.get('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
        
    });

    //Add customer
    server.post('/customers', async (req, res, next) => {
        //check for JSON
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const {name, email, balance} = req.body;

        const customer = new Customer({
            name,
            email,
            balance
        });

        try {
            const newUser = await customer.save();
            res.send(201); //Request được chấp nhận cho xử lý, nhưng việc xử lý chưa hoàn thành.
        } catch (error) {
            return next(errors.InternalError(error.message));
        }
    });

    //Update customer
    server.put('/customers/:id', async (req, res, next) => {
        //check for JSON
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try {
            const customer = await Customer.findOneAndUpdate( {_id: req.params.id}, req.body );
            res.send(200);
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //Delete customer
    server.del('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findOneAndRemove( {_id: req.params.id} );
            res.send(204);//Server đã xử lý thành công request nhưng không trả về bất cứ content nào.
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });
};