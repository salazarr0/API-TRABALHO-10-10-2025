import { app } from "./app";
import { userRouter } from "./routes/UserRouter";
import { petRouter } from "./routes/PetRouter";
app.use('/users', userRouter);
app.use('/pets', petRouter);