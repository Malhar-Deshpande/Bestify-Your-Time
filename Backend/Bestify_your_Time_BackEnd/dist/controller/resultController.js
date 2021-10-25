"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultController = void 0;
const resultModel_1 = require("../models/resultModel");
class resultController {
    create(request, response) {
        const newResult = request.body;
        console.log(newResult);
        resultModel_1.Result.create(newResult).then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
}
exports.resultController = resultController;
