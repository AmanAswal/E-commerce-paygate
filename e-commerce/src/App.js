import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Products from './components/Products/index'

const baseUrl = `http://localhost:8000`;

function App() {

  const [products, setProducts] = useState([]);

  useEffect(()=> {
    getProducts();
  },[]);

  const getProducts = async () => {
    const res = await axios.get(`${baseUrl}/products`);
    console.log(res);
    if(res.status === 200){
      setProducts(res.data);
    }
  };

  const buyNow = (productId) => {
    alert(productId);
  }

  return (
    <div className="App">
      <h1>welcome</h1>
      <Products products={products} buyNow={buyNow} />
    </div>
  );
}

export default App;
