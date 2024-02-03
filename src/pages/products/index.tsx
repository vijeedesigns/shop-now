import React, { useEffect, useReducer } from 'react';
import { getProducts } from '../../store/index.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { Table } from '../../components/index.ts';
import { apiUrl } from '../../constants/index.js';
import "./index.scss";

type ProductItem = {
    guid: string,
    name: string,
    details: string,
    image: string,
    count: number,
    rating: number
};

interface State {
    search: string,
    productList: Array<ProductItem>
}

type ReducerAction = Object;

const initaialState: State = {
    search: '',
    productList: []
}

const reducer = (state: State, action: ReducerAction) => {
    return {...state, ...action}
}

const PageProducts = () => {
    const [state, dispatch] = useReducer(reducer, initaialState);
    const {search, productList} = state;

    const productListOriginal = useAppSelector(state=>state.products.productList);

    const reduxDispatch = useAppDispatch();

    useEffect(() => {
        reduxDispatch(getProducts());
    }, [reduxDispatch]);

    useEffect(() => {
        if(productListOriginal) {
            const productList = productListOriginal.filter(product => {
                return product.name.toLowerCase().includes(search.toLowerCase());
            });
            dispatch({productList});
        }
    }, [search, productListOriginal]);

    const handleDelete = (row: ProductItem) => {
        console.log("row?.guid ", row?.guid);
    }

    const tableColumns = [{
        header: 'Image',
        accessor: 'image',
        render: (row: ProductItem) => <img className='thumbnail-50' src={`${apiUrl}${row.image}`} alt={row.name} />
    },{
        header: 'Name',
        accessor: 'name'
    },{
        header: 'Action',
        accessor: 'action',
        render: (row: ProductItem) => <div onClick={()=>handleDelete(row)}><span className="material-symbols-outlined">delete</span></div>
    }];

    return (
        <div className='page page-products'>
            <div>
                <input type='text' value={search} onChange={e=>dispatch({search: e.target.value})} />
            </div>
            <Table columns={tableColumns} data={productList} />
        </div>
    );
};

export default PageProducts;
