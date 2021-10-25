import { check } from "express-validator";
import { ValidationHalt } from "express-validator/src/base";
import validator  from "validator";


export function createUservalidation(data:any){

return [
    check("email").not().isEmpty().withMessage("invalid email "),
    check("password").not().isEmpty().withMessage("invalid password")
];

}