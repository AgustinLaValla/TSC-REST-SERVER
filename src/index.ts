//Imports
import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import postsRoutes from './routes/postsRoutes';
import usersRoutes from './routes/usersRoutes';

class Server {

    public app:express.Application;

    constructor() { 
        this.app = express();
        this.config();
        this.routes();
    }

    config() { 
        //Database connection
        const MONGO_URI = 'mongodb://localhost/restapits';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser:true,
            useCreateIndex:true
        }).then(db => console.log(`${colors.yellow('DATABASES IS CONNECTED!')}`));
        //Settings
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json()); //BodyParser
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() { 
        this.app.use(indexRoutes);
        this.app.use('/api/posts' ,postsRoutes);
        this.app.use('/api/users', usersRoutes);
    }

    start() { 
        this.app.listen(this.app.get('port'), () => {
            console.log(`${colors.magenta('server on port:')} ${colors.green(this.app.get('port'))}`);
        });
    }
}

//Intance of Server
const server = new Server();
//Execute Server
server.start();