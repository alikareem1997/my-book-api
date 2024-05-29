const express = require('express');
const app = express();
app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book Title",
    author: "Author Name",
    genre: "Genre",
    rating: 4.5,
    reviews: [
      {
        user: "User1",
        review: "Great book!",
        rating: 5
      }
    ]
  }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/search', (req, res) => {
  const query = req.query.query;
  const results = books.filter(book => book.title.includes(query) || book.author.includes(query) || book.genre.includes(query));
  res.json(results);
});

app.get('/books/recommendations', (req, res) => {
  const recommendations = books.filter(book => book.rating > 4);
  res.json(recommendations);
});

app.post('/books/:id/reviews', (req, res) => {
  const bookId = parseInt(req.params.id);
  const review = req.body;
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.reviews.push(review);
    res.json({ message: "Review added successfully." });
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  newBook.reviews = [];
  books.push(newBook);
  res.json({ id: newBook.id, message: "Book added successfully." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
