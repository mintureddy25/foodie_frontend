import { baseApi } from './baseApi';

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({ customerId, data }) => ({
                url: `/customers/${customerId}/orders`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["orders", "customer"],
        }),
        getOrder: builder.query({
            query: ({ customerId, orderId }) => `/customers/${customerId}/orders/${orderId}`,
            providesTags: ['order'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateOrderMutation, useGetOrderQuery } = orderApi;
