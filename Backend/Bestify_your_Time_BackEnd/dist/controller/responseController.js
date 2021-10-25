"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseController = void 0;
const responseModel_1 = require("../models/responseModel");
class responseController {
    create(request, response) {
        const newResponse = request.body;
        console.log(newResponse);
        responseModel_1.ResponseData.bulkCreate(newResponse)
            .then((data) => {
            response.status(200).json(data);
        })
            .catch((error) => console.log(error));
    }
    GET(request, response) {
        responseModel_1.ResponseData.findAll({
            where: {
                quiz_id: request.params.quiz_id,
                user_id: request.params.user_id
            }
        }).then((data) => {
            response.status(200).json(data);
            ;
        }).catch((error) => {
            response.status(400).json(error);
            ;
        });
    }
}
exports.responseController = responseController;
