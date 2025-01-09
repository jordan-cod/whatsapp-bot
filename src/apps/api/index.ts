import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

function startServer() {
    app.listen(process.env.PORT || 8081, () => {
        console.log(
            `[API] Server is running on port ${process.env.PORT || 8081}`
        );
    });
}

export default startServer;
