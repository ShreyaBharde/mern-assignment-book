import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

const BookForm = () => {
  const location = useLocation();

  const navigate = useNavigate();

 
  const handleLogout = () => {

    navigate("/home");}

  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    price: '',
    image: null,
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('image', formData.image);

    try {
      if (isUpdating && selectedBook) {
        const { _id } = selectedBook;
        await axios.put(`http://localhost:8080/books/${_id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:8080/books', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setFormData({
        title: '',
        author: '',
        genre: '',
        description: '',
        price: '',
        image: null,
      });
      fetchBooks();
      setSelectedBook(null);
      setIsUpdating(false);
    } catch (error) {
      console.error('Error adding/updating book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const selectBookForUpdate = (book) => {
    setSelectedBook(book);
    setIsUpdating(true);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      price: book.price,
      image: book.image, // Assuming image is already available in the book object
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center mt-5">Hello {location.state.id}</h1>
            <hr />
            
          </div>

          <div className="row justify-content-center">
  <div className="col-md-6 mb-3 text-center">
    <button type="submit" className="btn btn-primary mx-auto" onClick={handleLogout}>Logout</button>
  </div>
</div>

          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center mt-5">{isUpdating ? 'Update Book' : 'Add Book'}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="text-center">
          <div className="row justify-content-center">
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <label htmlFor="genre" className="form-label">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              placeholder="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <label htmlFor="image" className="form-label">Choose Image</label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <button type="submit" className="btn btn-primary">{isUpdating ? 'Update Book' : 'Add Book'}</button>
          </div>
        </div>
          </div>
          
        </form>
      </div>

      <div className="container my-5 py-5">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">Books Collection</h1>
          <hr />
        </div>
        <div className="row justify-content-center">
          {books.map((book) => (
            <div className="col-md-3 mb-4" key={book._id}>
              <div className="card h-100 text-center p-4 shadow-sm mb-5 bg-white rounded">
                {/* Corrected image URL field name to 'imageURL' */}
                <img src={`http://localhost:8080${book.imageURL}`} height="250px" className="card-img-top" alt={book.title} />
                <div className="card-body">
                  <h5 className="card-title mb-0">{book.title.substring(0, 20)}...</h5>
                  <p className="card-text lead fw-bold">${book.price}</p>
                  <button className='btn btn-primary ms-4' onClick={() => selectBookForUpdate(book)}>Update</button>
                  <button className='btn btn-primary ms-4' onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookForm;
