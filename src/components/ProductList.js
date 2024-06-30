import {useDispatch, useSelector} from "react-redux";
import "./style.css";
import React, {useEffect, useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import {formatCurrency} from '../FormatCurrency';
import {Dropdown} from "react-bootstrap";
import {filterProducts, searchProducts} from "../redux/Action";
import styles from './ProductList.module.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const currentFilter = useSelector(state => state.filter)
    const products = useSelector(state => {
        const products = state.products;
        const filter = state.filter;
        const search = state.search;
        return products.filter((p) => {
            const matchsFilter = (filter === "ALL") || (filter !== "ALL" && filter == p.categoryId)//filter co the la str/number nen ==
            const matchsSearch = p.name.toLowerCase().includes(search)
            return matchsFilter && matchsSearch;
        })
    });
    const cart = useSelector(state => state.cart);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('/jsondata/categories.json')
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
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); // số sản phẩm hiển thị
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    //
    return (
        <div>
            <div className={"d-flex justify-content-center my-4"}>
                <input
                    className="form-control w-50"
                    type="search"
                    placeholder="Nhập để tìm cây giống..."
                    aria-label="Search"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <select className={"text-center rounded fw-bold bg-success text-white"}
                        value={currentFilter}//1,2,3,.... else all
                        onChange={(e) => handleFilter(e.target.value)} //bắn action
                >
                    <option value="ALL">Tất cả</option>
                    {categories.map((c, index) => (
                        <option value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div className="container mt-5">
                <div className="mb-5 row">
                    {currentProducts.map(product => (
                        <div key={product.id} className={"p-2 col-3 text-center"}>
                            <div className={"p-2 border rounded-3"}>
                                <Link className={"text-decoration-none text-dark"}
                                      to={`/product/${product.id}`}>
                                    <div>
                                        <img
                                            src={product.img}
                                            className={"w-100 h-100 border rounded-3 hover-scale"}
                                            alt={product.name}/>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <div className={"d-flex justify-content-center"}>Giá:&nbsp;
                                        <p className={"text-danger fw-bold"}>{formatCurrency(product.price)}</p>
                                    </div>
                                </Link>
                                <button className={"btn btn-success"}>Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/*Phân Trang*/}
                <ul className="pagination d-flex justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            {/**/}
            </div>
        </div>
    )
}
export default ProductList;