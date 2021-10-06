import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/Product';
import './HomeScreen.css';

import { getProducts as listProducts } from '../redux/actions/productActions'

const HomeScreen = () => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.user);
    const getProducts = useSelector(state => state.getProducts);
    const { products, loading, error } = getProducts;

    const user = auth?.user?.user?.user;

    useEffect(() => {
        dispatch(listProducts())
        console.log(user);
    }, [dispatch, user]);

    return (
        <div className='homescreen'>
            <h2 className='homescreen__title'>
                Latest Products {user?.username}
            </h2>

            <div className='homescreen__products'>
                {loading ? (
                    <h2>Loading...</h2> 
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    products.map((product) => 
                    <Product 
                        key={product._id}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.imageUrl}
                    />)
                )}
            </div>
        </div>
    )
}

export default HomeScreen
