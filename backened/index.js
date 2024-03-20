//import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//file upload and multer

app.use('/uploads', express.static('uploads'));
const upload = multer({ storage: storage });
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Database Started');
});

//Modules Start

//book modle
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    imageURL: String,
    price: Number, // Add price field
});

const Book = mongoose.model('Book', bookSchema);

//Cart model
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
});

const Cart = mongoose.model('Cart', cartSchema);


//Order model
const orderSchema = new mongoose.Schema({
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    totalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);


//user model
const User = mongoose.model('User', {
    username: String,
    password: String,
  });
  
//Modules End


  // Signup route
  app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Signin route
  app.post('/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'Username not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ username: user.username }, 'Abcdefghijklmnopqrstuvwxyz0123456789');
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Admin Crud Routes

app.get('/books', async (req, res) => {
    try {
        let filter = {};
        if (req.query.author) {
            filter.author = req.query.author;
        }
        if (req.query.genre) {
            filter.genre = req.query.genre;
        }
        
        const books = await Book.find(filter);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.post('/books', upload.single('image'), async (req, res) => {
    const { title, author, genre, description, price } = req.body;
    const image = req.file;

    try {
        const newBook = new Book({
            title,
            author,
            genre,
            description,
            price,
            imageURL: image ? `/uploads/${image.filename}` : '',
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.put('/books/:id', upload.single('image'), async (req, res) => {
    const { title, author, genre, description, price } = req.body;
    const imageURL = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book does not exist' });
        }
        
        book.title = title;
        book.author = author;
        book.genre = genre;
        book.description = description;
        book.price = price;

        if (imageURL) {
            book.imageURL = imageURL;
        }

        await book.save();
        res.status(200).json(book);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: 'Book does not exist' });
            return;
        }
        await book.deleteOne({_id: req.params.id});
        res.json({ message: 'Book deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});




  //User Cart Actions Route

app.post('/cart/add', async (req, res) => {
    const { productId } = req.body;
    try {
        const book = await Book.findById(productId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const cartItem = new Cart({ productId: book._id });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/cart/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//User Checkout Actions Route
app.post('/orders', async (req, res) => {
    const { cartItems, totalPrice } = req.body;
    try {
        const order = new Order({ cartItems, totalPrice });
        await order.save();

        // Optionally, you can clear the cart after successful checkout
        await Cart.deleteMany();

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/cart', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Server Listen
app.listen(port, () => {
    console.log('Server started');
});
