import React, {useEffect, useState} from "react";
import './TopBooks.css'
import { Link } from 'react-router-dom';

function TopBooks(props){
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getBooks() {
    setLoading(true);
    setError('');
  
try {   
    let response = await fetch('books'); 
    if (response.ok) {
         let data = await response.json(); 
        setBooks(data);  
    } else {
        setError(`Server error: ${response.status} ${response.statusText}`);
    }
} catch (err) {  
    setError(err.message);
}

setLoading(false);
}

useEffect(() => {
  getBooks();
},[]);



    return (
        <div className="bookContainer">
          
          <div className="row row-cols-4">

        {books.map((b) => (
  
        <div className="col">
      <div className="card bookCard">
          <img src={b.image}className="card-img-top" alt="book 1" />
          <div className="card-body">
            <Link to={b.id} className="card-title">{b.title}</Link>
            <h5 className="card-title">by {b.author}</h5>
            <p className="card-text">Default description lots lots lots of text ahahhahah woooo it works niicee</p>
            </div></div></div>))}
            </div>
      
            
          </div>
          
          
    );
}

export default TopBooks;