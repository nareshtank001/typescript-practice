import { get, controller, use } from "./decorators";
import { Request, Response, NextFunction } from "express";

function AuthRequired(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn === true) {
        next();
        return;
    }

    res.status(403);
    res.send('Not premitted');

}

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are logged in</div>
                    <a href="/auth/logout">logout</a>
                </div>
            `);
        } else {
            res.send(`
                <div>
                    <div>You are not logged in</div>
                    <a href="/auth/login">Login</a>
                </div>
            `);
        }
    }

    @get('/protected')
    @use(AuthRequired)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route,logged in user');
    }
}