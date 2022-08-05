import React, { useEffect } from 'react';
import Driveway from '../Driveway';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((driveway) => {
        idbPromise('products', 'put', driveway);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (driveway) => driveway.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Available Driveways:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((driveway) => (
            <Driveway
              key={driveway._id}
              _id={driveway._id}
              image={driveway.image}
              name={driveway.name}
              price={driveway.price}
              quantity={driveway.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;