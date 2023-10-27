import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the book store projects");
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
