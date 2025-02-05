import { configureStore } from '@reduxjs/toolkit';
import { entryApiSlice } from './entry/slice';
import { profileApiSlice } from './profile/slice';
import { informationApiSlice } from './information/slice';
import { transactionApiSlice } from './transaction/slice';

export const store = configureStore({
	reducer: {
		[entryApiSlice.reducerPath]: entryApiSlice.reducer,
		[profileApiSlice.reducerPath]: profileApiSlice.reducer,
		[informationApiSlice.reducerPath]: informationApiSlice.reducer,
		[transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat([
			entryApiSlice.middleware,
			profileApiSlice.middleware,
			informationApiSlice.middleware,
			transactionApiSlice.middleware,
		]);
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
