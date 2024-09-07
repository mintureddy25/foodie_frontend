import { baseApi } from './baseApi';

const categoryApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getFoodCategories: builder.query({
            query: () => `/foodCategories`,
            providesTags: ['foodCategories'],
        }),

    }),
    overrideExisting: false,
    
});

export const { useGetFoodCategoriesQuery} = categoryApi;