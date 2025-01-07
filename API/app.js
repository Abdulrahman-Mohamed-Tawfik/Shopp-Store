import express from "express";
import connectDB from "./Config/db.config.js";
import userRouter from "./Routers/User.router.js";
import userTypeRouter from "./Routers/UserType.router.js";
import productRouter from "./Routers/Product.router.js";
import categoryRouter from "./Routers/Category.router.js";
import cartRouter from "./Routers/Cart.router.js";
import cors from "cors";

const port = 7000;
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

connectDB();


app.use("/user", userRouter);
app.use("/userType", userTypeRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use('/images', express.static("./imgs"));

app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
})