import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import { IInfo } from "../../Data/index";
import { NavLink as Link } from 'react-router-dom';

const Pagination = () => {
    const dispatch = useDispatch();

    const products:any = useSelector<any>(s => s.products);
    const productDetail:any = useSelector<any>(s => s.productsDetail);

    const [render, setRender] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(8);

    const [pageNumberLimit, setpageNumberLimit] = useState(8);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(8);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (e: any) => {
        setcurrentPage(Number(e.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage; // 8
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; //0

    let currentItems;

    if (Array.isArray(products)) {
        currentItems = render.slice(indexOfFirstItem, indexOfLastItem); //0-8
    }

    const renderPageNumbers = pages.map((number: any) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? 'active' : ''}>
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const renderProduct = (products: any) => {
        return (
            <div>
                <div className='sheetGrid'>
                    {productDetail?.length >= 1 ?
                        productDetail?.map((e: IInfo, index: number) => {
                            return (
                                <div className='imgproducts' key={index}>
                                    <Link style={{ textDecoration: 'none', color: '#FFF' }} to={`/product/${e.id}`}>
                                        <h1>{e.name.toUpperCase()}</h1>
                                        <h2>${e.price}.00</h2>
                                        <img src={e.img} alt={e.name} />
                                    </Link>
                                </div>
                            )
                        })
                        :
                        products?.map((e: IInfo, index: number) => {
                            return (
                                <div className='imgproducts' key={index}>
                                    <Link style={{ textDecoration: 'none', color: '#FFF' }} to={`/product/${e.id}`}>
                                        <div>{e.name.toUpperCase()}</div>
                                        <div>${e.price}.00</div>
                                        <img src={e.img} alt={e.name} />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(getProducts);
    }, [getProducts]);

    useEffect(() => {
        setRender(products);
    }, [products]);

    return (
        <div>
            <ul className='pageNumbers'>
                <li>
                    <button
                        onClick={handlePrevbtn}
                        disabled={currentPage === pages[0] ? true : false}>
                        Prev
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li>
                    <button
                        onClick={handleNextbtn}
                        disabled={currentPage === pages[pages.length - 1] ? true : false}>
                        Next
                    </button>
                </li>
            </ul>
            {renderProduct(currentItems)}
        </div>
    );
};

export default Pagination;