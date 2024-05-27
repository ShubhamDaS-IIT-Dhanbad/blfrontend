import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from "../loading/loading.jsx"
import AllProductPageCard from '../allProductPageCard/allProductPageCard.jsx';
import "./searchPageCss.css"
import { searchedProducts } from '../../../redux/features/products/productSlics.jsx';
function SearchPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const searchedProducts = useSelector(state => state.products.searchedProducts);

  useEffect(() => {
     dispatch(searchedProducts("a"));
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
