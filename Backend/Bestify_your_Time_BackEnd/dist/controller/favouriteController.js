"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteController = void 0;
const fovouriteModel_1 = require("../models/fovouriteModel");
class favouriteController {
    create(request, response) {
        const newfavourite = request.body;
        console.log(newfavourite);
        fovouriteModel_1.Favourite.create(newfavourite).then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
}
exports.favouriteController = favouriteController;
