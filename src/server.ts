//Samuel Salazar B Guimarães 1-24-11791

import { app } from "./app";
import { userRouter } from "./routes/UserRouter";
import { petRouter } from "./routes/PetRouter";
app.use('/users', userRouter);
app.use('/pets', petRouter);