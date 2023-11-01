import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
const app = express();
app.use(express.json()); //Middleware for parsing request body
//Middleware to handle CORS policy
app.use(cors()); //andle all origin with default cors(*)
//custom cors and only browser with this server can access
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);
app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the book store projects");
});

app.use("/books", booksRoute);
mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("Connected successfully");
		app.listen(PORT, () => {
			console.log(`listening on a port:${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
