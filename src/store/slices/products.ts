import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchHandler } from "../fetchHandler";

export const getProducts = createAsyncThunk("getProducts", async () => {
    return await fetchHandler({
        url: "products/list",
        method: "GET",
        secure: true
    });
});

type ProductItem = {
    guid: string,
    name: string,
    details: string,
    image: string,
    count: number,
    rating: number
};

interface InitialState {
    productList: Array<ProductItem>
}

const initialState: InitialState = {
    productList: []
}

type GetProductsPayloadAction = {
    data: {
        data: ProductItem[],
        status: number,
        message: string
    }
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state: InitialState) => {
            state.productList = [];
        })
        .addCase(getProducts.fulfilled, (state: InitialState, action: PayloadAction<GetProductsPayloadAction>) => {
            const data = action?.payload?.data;
            if(data?.status === 200) {
                state.productList = data?.data;
            } else {
                state.productList = [];
            }
        })
    }
});

export default productSlice.reducer;
