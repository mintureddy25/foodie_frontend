import { baseApi } from './baseApi';

const foodItemApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getFoodItem: builder.query({
            query: (foodItemId) => `/eateries/foodItems/${foodItemId}`,
            providesTags: ['eateries'],
        }),
        getFoodItems: builder.query({
            query: ({eateryId}) => `/eateries/${eateryId}/foodItems`,
            providesTags: ['eateries','foodItems'],
        }),
        updateFoodItem: builder.mutation({
            query: ({ eateryId, foodItemId, data }) => ({
                url: `/eateries/${eateryId}/foodItems/${foodItemId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["eateries", "foodItem"],
        }),
        addFoodItem: builder.mutation({
            query: ({ eateryId, data }) => ({
                url: `/eateries/${eateryId}/foodItems`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["eateries", "foodItem"],
        }),
    }),
    overrideExisting: false,
    
});

export const { useGetFoodItemQuery, useGetFoodItemsQuery, useUpdateFoodItemMutation, useAddFoodItemMutation} = foodItemApi;
