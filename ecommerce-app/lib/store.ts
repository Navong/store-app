// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/lib/features/cartSlice';
import { wishlistReducer } from '@/lib/features/wishListSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList : wishlistReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
