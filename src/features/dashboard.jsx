import { useGetCustomerEateriesQuery } from "../app/services/customerApi";
  
  const images = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877dfd7c7b7' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1556740725-6d6f8b0295b7' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1589300787818-7c9b4385b29a' },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1585640933372-f8bb2c63a89f' },
    { id: 5, imageUrl: 'https://images.unsplash.com/photo-1560076658-8d5563d0e05b' },
    { id: 6, imageUrl: 'https://images.unsplash.com/photo-1565469565-df43f7f64d77' },
    { id: 7, imageUrl: 'https://images.unsplash.com/photo-1590494436620-10e0ab2a5757' },
    { id: 8, imageUrl: 'https://images.unsplash.com/photo-1600132158401-ecb3f4e7a3d6' },
    { id: 9, imageUrl: 'https://images.unsplash.com/photo-1506748686214e9df14a3f2' },
    { id: 10, imageUrl: 'https://images.unsplash.com/photo-1604903067320-328c2d9a4a88' },
  ];

  const mergeData = (restaurants, images) => {
    return restaurants.map((restaurant, index) => {
      const imageIndex = index % images.length;
      const image = images[imageIndex];
      
      return {
        ...restaurant,
        imageUrl: image ? image.imageUrl : null
      };
    });
  };
  
  export default function Dashboard() {


    const { data: eateries, isLoading, isError, refetch } = useGetCustomerEateriesQuery(1);
    console.log("mintu",eateries);


    const eateriesData = mergeData(eateries,images);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Eateries</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {eateriesData.map((eatery) => (
              <a key={eatery.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={eatery.imageUrl}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{eatery.name}</h3>
        
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
