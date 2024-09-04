import { baseApi } from './baseApi';

const customerApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getCustomerEateries: builder.query({
            query: (customerId) => `/customer/${customerId}/eateries`,
            providesTags: ['eateries'],
        }),
    }),
    overrideExisting: false,
    
});

export const { useGetCustomerEateriesQuery } = customerApi;
