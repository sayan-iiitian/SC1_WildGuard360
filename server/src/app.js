import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());

app.use(express.json({limit: '16kb'}));

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(cookieParser());


//routes import 
import userRouter from './routes/user.route.js';
import { User } from './models/user.model.js';



//routes declaration
app.use('/api/v1/users',userRouter);
//http://localhost:3000/api/v1/users/register


app.get('/getuser/:username', async function(req, res) {
    const fetchuser = req.params.username;
    try {
        const user = await User.findOne({ username: fetchuser });
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default app;