import { Router, Request, Response, NextFunction } from 'express';


interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

const router = Router();
function AuthRequired(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn === true) {
        next();
        return;
    }

    res.status(403);
    res.send('Not premitted');

}

router.get('/login', (req: Request, res: Response) => {
    res.send(`
       <form method="POST">
            <div>
            <lable>Email</label>
            <input name="email">
            </div>
            <div>
            <label>Password</label>
            <input type="password" name="password" >
            </div>
            <button>Submit</button>

       </form>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    if (email && password && email === 'hi@hi.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.send('Invalid email or password');
    }
});

router.get('/', (req: RequestWithBody, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">logout</a>
            </div>
        `);
    } else {
        res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `);
    }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
    req.session = undefined;
    res.redirect('/');

});


router.get('/protected', AuthRequired, (req: RequestWithBody, res: Response) => {
    res.send('Welcome to protected route,logged in user');
});

export { router }
