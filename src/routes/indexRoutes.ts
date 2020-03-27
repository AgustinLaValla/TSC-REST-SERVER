import { Router, Request, Response } from 'express';

class IndexRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req, res) => {
            res.send('Api: /api/posts');
        });
    }
}

const indexRoute = new IndexRoutes();

export default indexRoute.router; 
