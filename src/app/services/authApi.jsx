import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        customerLogin: builder.mutation({
            query: (credentials) => ({
                url: '/customer/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        customerSignup: builder.mutation({
            query: (credentials) => ({
                url: '/customer/signup',
                method: 'POST',
                body: credentials,
            }),  
        }),
        eateryLogin: builder.mutation({
            query: (credentials) => ({
                url: '/eatery/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        eaterySignup: builder.mutation({
            query: (credentials) => ({
                url: '/eatery/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCustomerLoginMutation,
    useCustomerSignupMutation,
    useEateryLoginMutation,
    useEaterySignupMutation
} = authApi;