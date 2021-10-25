import app from './app'
import * as dotenv from "dotenv";
import { Console } from 'console';
dotenv.config()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`user server started ${PORT}`);
})