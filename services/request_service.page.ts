let chai = require("chai"),
chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { credentials } from '../utils/variables.ts';
const server =credentials.server;

export class todoService {
    async getChai(userId: string, token: string){
        let path = "todos?user=" + userId;
        return await chai
            .request(server)
            .get(path)
            .set('Authorization', token)
          
    }
};