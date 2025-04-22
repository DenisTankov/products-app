import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
   id: number;
   title: string;
   description: string;
   thumbnail: string;
   isFavorite: boolean;
}

interface NewProductPayload {
   title: string;
   description: string;
   thumbnail: string;
}

interface ApiProduct {
   id: number;
   title: string;
   description: string;
   thumbnail: string;
   [key: string]: unknown;
}

interface ProductsResponse {
   products: ApiProduct[];
}

export enum Status {
   Idle = "idle",
   Loading = "loading",
   Succeeded = "succeeded",
   Failed = "failed",
}

export enum FilterType {
   All = "all",
   Favorites = "favorites",
}

interface ProductsState {
   items: Product[];
   status: Status;
   filter: FilterType;
}

const initialState: ProductsState = {
   items: [],
   status: Status.Idle,
   filter: FilterType.All,
};

export const fetchProducts = createAsyncThunk<Product[]>("products/fetch", async () => {
   const { data } = await axios.get<ProductsResponse>("https://dummyjson.com/products");

   return data.products.map(
      (p): Product => ({
         id: p.id,
         title: p.title,
         description: p.description,
         thumbnail: p.thumbnail,
         isFavorite: false,
      })
   );
});

const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {
      toggleFavorite(state, action: PayloadAction<number>) {
         const product = state.items.find((p) => p.id === action.payload);
         if (product) product.isFavorite = !product.isFavorite;
      },
      deleteProduct(state, action: PayloadAction<number>) {
         state.items = state.items.filter((p) => p.id !== action.payload);
      },
      setFilter(state, action: PayloadAction<FilterType>) {
         state.filter = action.payload;
      },
      addProduct(state, action: PayloadAction<NewProductPayload>) {
         const { title, description, thumbnail } = action.payload;
         const maxId = state.items.reduce((max, p) => Math.max(max, p.id), 0);
         const newProduct: Product = {
            id: maxId + 1,
            title,
            description,
            thumbnail,
            isFavorite: false,
         };
         state.items.unshift(newProduct);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.status = Status.Loading;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = Status.Succeeded;
            state.items = action.payload;
         })
         .addCase(fetchProducts.rejected, (state) => {
            state.status = Status.Failed;
         });
   },
});

export const { toggleFavorite, deleteProduct, setFilter, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
