import { Router, Response, Request } from 'express';
import Post from '../models/Posts';

class PostsRoutes {

    public router: Router;
 
    constructor() {
        this.router = Router();
        this.routes();
    }

    async getPosts(req:Request, res:Response): Promise<void> { 
        const posts = await Post.find();  //Returns all the posts
        res.json(posts);
    }

    async getPost(req: Request, res:Response): Promise<void> { 
        const { url } = req.params;
        const post = await Post.findOne({url: url});
        res.json(post);
    }
    
    async createPost(req: Request, res:Response): Promise<void> { 
        const { title, url,content, image } = req.body;
        const newPost = new Post({title, url, content, image});
        await newPost.save();
        res.json({message:'Post succesfully created', data: newPost});
    }

    async updatePost(req: Request, res:Response): Promise<void> {
        const { url } = req.params;
        const { body } = req;
        const post = await Post.findOneAndUpdate({url}, body, {new:true});
        res.json(post);
     }

    async deletePost(req: Request, res:Response): Promise<void>  { 
        const { url } = req.params;
        await Post.findOneAndDelete({url:url});
        res.json({message:'Post succesfully deleted'});
    }

    routes(): void { 
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }

}

const postRoutes = new PostsRoutes();

export default postRoutes.router;