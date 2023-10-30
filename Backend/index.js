import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the book store projects");
});

app.use(express.json()); //Middleware for parsing request body
// route to add new book
app.post("/books", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({ message: "Send all required fileds" });
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};
		const book = await Book.create(newBook);
		return response.status(201).send(book); //sending the content of the new book
	} catch (error) {
		console.log(error);
		response.status(500).send({ message: error.message });
	}
});
//Route to get all the books from the database
app.get("/books", async (request, response) => {
	try {
		const books = await Book.find({});
		return response.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error);
		response.status(500).send({ message: error.message });
	}
});
//Route to get one book from the database by id
app.get("/books/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const book = await Book.findById(id);
		return response.status(200).json(book);
	} catch (error) {
		console.log(error);
		response.status(500).send({ message: error.message });
	}
});
//Route to update the books
app.put("/books/:id", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({ message: "Send all required fileds" });
		}
		const { id } = request.params;
		const result = await Book.findByIdAndUpdate(id, request.body);
		if (!result) {
			return response.status(404).json({ message: "Book not found" });
		}
		return response.status(200).send({ message: "Book updated succssfully" });
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
