"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
let AdminService = class AdminService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        // To show the added question table
        this.isAdded = false;
        this.referenceObject = { question_id: 0, question: '', choice1: '', choice2: '', choice3: '', choice4: '', answer: '', quiz_id: 0 };
        this.mcqQuestions = [
            this.referenceObject,
        ];
        this.brainTeaserQuestions = [
            this.referenceObject,
        ];
        this.url = 'http://localhost:8080/quiz';
        this.compareQuestionObjects();
    }
    onSubmitQuiz(objToSend) {
        const httpOptions = {
            headers: new http_1.HttpHeaders({
                token: sessionStorage['token']
            })
        };
        console.log("Sending this object ", objToSend);
        return this.httpClient.post(this.url, objToSend, httpOptions);
    }
    onSubmitBrainTeaser(objToSend) {
        const httpOptions = {
            headers: new http_1.HttpHeaders({
                token: sessionStorage['token']
            })
        };
        console.log("Sending this object ", objToSend);
        return this.httpClient.post(this.url, objToSend, httpOptions);
    }
};
AdminService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" ? _a : Object])
], AdminService);
exports.AdminService = AdminService;
return this.httpClient.get("http://localhost:8080/all-quiz", httpOptions);
compareQuestionObjects();
{
    console.log('Inside helper function......');
    this.mcqQuestions.forEach((value, index) => {
        if (JSON.stringify(value) == JSON.stringify(this.referenceObject)) {
            this.mcqQuestions.splice(index, 1);
        }
    });
}
