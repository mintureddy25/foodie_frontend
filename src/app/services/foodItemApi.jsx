import { baseApi } from './baseApi';

const foodItemApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getFoodItem: builder.query({
            query: (foodItemId) => `/eateries/${foodItemId}`,
            providesTags: ['eateries'],
        }),
        
    }),
    overrideExisting: false,
    
});

export const { useGetFoodItemQuery } = foodItemApi;
