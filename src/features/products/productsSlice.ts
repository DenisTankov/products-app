import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
   id: number;
   title: string;
   description: string;
   thumbnail: string;
   isFavorite: boolean;
}

interface ProductsState {
   items: Product[];
   status: "idle" | "loading" | "succeeded" | "failed";
   filter: "all" | "favorites";
}

const initialState: ProductsState = {
   items: [],
   status: "idle",
   filter: "all",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
   const response = await axios.get("https://dummyjson.com/products");
   return response.data.products.map((product: any) => ({
      ...product,
      isFavorite: false,
   }));
});

const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {
      toggleFavorite: (state, action: PayloadAction<number>) => {
         const product = state.items.find((p) => p.id === action.payload);
         if (product) product.isFavorite = !product.isFavorite;
      },
      deleteProduct: (state, action: PayloadAction<number>) => {
         state.items = state.items.filter((p) => p.id !== action.payload);
      },
      setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
         state.filter = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "succeeded";
         })
         .addCase(fetchProducts.rejected, (state) => {
            state.status = "failed";
         });
   },
});

export const { toggleFavorite, deleteProduct, setFilter } = productsSlice.actions;
export default productsSlice.reducer;
