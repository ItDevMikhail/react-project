import Router from "express";
import UsersController from "../controllers/usersController.js";

const userRouter = new Router();

userRouter.get('/auth', UsersController.autorization);
userRouter.post('/reg', UsersController.addUser);
userRouter.post('/login', UsersController.login);
userRouter.get('/logout', UsersController.logout);
userRouter.get('/user', UsersController.userData);


export default userRouter;