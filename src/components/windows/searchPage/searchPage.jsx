import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from "../loading/loading.jsx"
import AllProductPageCard from '../allProductPageCard/allProductPageCard.jsx';
import "./searchPageCss.css"

function SearchPage() {
  const [loading, setLoading] = useState(true);
  const searchedProducts = useSelector(state => state.products.searchedProducts);
  useEffect(() => {
    setLoading(false);
  }, [searchedProducts]);

  if (loading) return <Loading />;
  return (
    <div className='search-page'>
      {searchedProducts && <AllProductPageCard products={searchedProducts} />}
    </div>
  );
}

export default SearchPage;
