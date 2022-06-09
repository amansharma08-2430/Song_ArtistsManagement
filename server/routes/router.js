const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description 
 *  @method GET 
 */
route.get('/add-song', services.add_song)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-song', services.update_song)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);

