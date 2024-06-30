import {useDispatch, useSelector} from "react-redux";
import "./style.css";
import React, {useEffect, useState} from 'react';
import {Link, useLocation, useOutletContext} from 'react-router-dom';
import {formatCurrency} from '../FormatCurrency';
import {filterProducts, searchProducts} from "../redux/Action";
import Header from "./Header";
import Search from "./Search";
import DetailFilters from "./DetailFilters";

const ProductList = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const currentFilter = useSelector(state => state.filter)
    const startPrice = useSelector(state => state.startPrice)
    const endPrice = useSelector(state => state.endPrice)
    const products = useSelector(state => {
        const products = state.products;
        const filter = state.filter;
        const search = state.search;
        return products.filter((p) => {
            const matchsFilter = (filter === "ALL") || (filter !== "ALL" && filter == p.categoryId); // filter can be str/number so == is used
            const matchsSearch = p.name.toLowerCase().includes(search);
            const matchsStartPrice = startPrice ? (p.price >= startPrice) : true;
            const matchsEndPrice = endPrice ? (p.price <= endPrice) : true;

            return matchsFilter && matchsSearch && matchsStartPrice && matchsEndPrice;
        });
    });
    const cart = useSelector(state => state.cart);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://json-server-api-tv8h.onrender.com/api/products')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching banner items:', error));
    }, []);

    const handleSearchChange = (value) => {
        setSearch(value);
        dispatch(searchProducts(value))
    }
    const handleFilter = (filter) => {
        dispatch(filterProducts(filter))
    }
    const location = useLocation();
    return (
        <div>
            <div className="container mt-2">
                <DetailFilters/>
                <div className="mb-5 row">
                    <div className="vct_title text-center mt-5">
                        {/*<h2 className={"background-image-vct"}>Giống cây ???</h2>*/}
                    </div>
                    {products.map(product => (
                        <div key={product.id} className={"p-2 col-3 text-center"}>
                            <div className={"p-2"}>
                                <Link className={"text-decoration-none text-dark"}
                                      to={`/product/${product.id}`}>
                                    <div className={"p-2"}>
                                        <img
                                            src={product.img}
                                            className={"w-100 h-100 border rounded-3 hover-scale"}
                                            alt={product.name}/>
                                    </div>
                                    <h3 className={"hover-name"}>{product.name}</h3>
                                    <div className={"d-flex justify-content-center"}>Giá:&nbsp;
                                        <p className={"text-danger fw-bold"}>{formatCurrency(product.price)}</p>
                                    </div>
                                </Link>
                                <button className={"btn btn-success"}>Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ProductList;