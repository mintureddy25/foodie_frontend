import { baseApi } from './baseApi';

const customerApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getCustomerEateries: builder.query({
            query: (customerId) => `/customers/${customerId}/eateries`,
            providesTags: ['eateries'],
        }),
        getEateryFoodItems: builder.query({
            query: ({customerId,eateryId}) => `/customers/${customerId}/eateries/${eateryId}/foodItems`,
            providesTags: ['foodItems'],
        }),

    }),
    overrideExisting: false,
    
});

export const { useGetCustomerEateriesQuery ,useGetEateryFoodItemsQuery } = customerApi;
