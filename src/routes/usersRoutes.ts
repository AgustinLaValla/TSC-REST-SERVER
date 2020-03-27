import { Router, Request, Response } from 'express';
import User from '../models/User';

class UserRoutes { 

    public router: Router;

    constructor() { 
        this.router = Router();
        this.routes();
    }

    async getUsers(req: Request, res: Response):Promise<void> {
        const users = await User.find();
        res.json(users);
     }

    async getUser(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        const user = await User.findById(id).populate('posts');
        res.json(user)
     }

    async createUser(req: Request, res: Response):Promise<void> {
        const { name, email, password, username } = req.body;
        const newUser = await new User({name, email, password, username});
        newUser.save();
        res.json({message: 'User Successfully Created' ,newUser});
     }

    async updateUser(req: Request, res: Response):Promise<void> { 
        const { id } = req.params;
        const { body } = req
        const user = await User.findOneAndUpdate({_id:id}, body, { new:true });
        res.json({message: 'User Succesfullu Updated' ,user});
    }

    async deleteUser(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        await User.findByIdAndRemove(id);
        res.json({message: 'User succesfully deleted'});
     }

    routes() { 
        this.router.get('/', this.getUsers);
        this.router.get('/:id', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
    }

}

const userRoutes = new UserRoutes();

export default userRoutes.router;
