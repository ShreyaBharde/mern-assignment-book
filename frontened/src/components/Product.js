import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import Header from './Header';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [authorFilter, setAuthorFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/books'); // Assuming your API is running on localhost:8080
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = () => {
    let filteredProducts = [...products];
    if (authorFilter) {
      filteredProducts = filteredProducts.filter(product => product.author === authorFilter);
    }
    if (genreFilter) {
      filteredProducts = filteredProducts.filter(product => product.genre === genreFilter);
    }
    return filteredProducts;
  };

  const cardItem = (item) => {
    return (
      <div className="col-md-3 mb-4 cardsi" key={item._id}>
        <div className="card cardsi h-100 text-center p-4 shadow-sm p-3 mb-5 bg-white rounded">
          <img src={`http://localhost:8080${item.imageURL}`} height="250px" className="card-img-top" alt={item.title} />
          <div className="card-body">
            <h5 className="card-title mb-0">{item.title.substring(0, 20)}...</h5>
            <p className="card-text lead fw-bold">${item.price}</p>
            <NavLink to={`/products/${item._id}`} className="btn btn-outline-primary">
              Buy Now
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Books Collection</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center mb-3">
  <div className="col-auto">
    <div className="d-flex">
      <select className="form-select mb-2 me-2" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
        <option value="">Select Author</option>
        {/* Map through unique authors */}
        {Array.from(new Set(products.map(product => product.author))).map(author => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>
      <select className="form-select" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
        <option value="">Select Genre</option>
        {/* Map through unique genres */}
        {Array.from(new Set(products.map(product => product.genre))).map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  </div>
</div>

        <div className="row justify-content-center">
          {applyFilters().map(cardItem)}
        </div>
      </div>
    </>
  );
};

export default Product;
