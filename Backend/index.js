import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the book store projects");
});
// route to add new book
app.post("/books", async (resquest, response) => {
	try {
		if (
			!resquest.body.title ||
			!resquest.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({ message: "Send all required fileds" });
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};
	} catch (error) {
		console.log(error);
		response.status(500).send({ message: error.message });
	}
});

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
