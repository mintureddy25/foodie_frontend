import { useGetCustomerEateriesQuery } from "../app/services/customerApi";
import { Link, useParams } from 'react-router-dom';

const images = [
  { id: 1, imageUrl: '/pexels-chanwalrus-1059943.jpg' },
  { id: 2, imageUrl: '/pexels-chevanon-323682.jpg' },
  { id: 3, imageUrl: '/pexels-ellis-mbeku-205041-633627.jpg' },
  { id: 4, imageUrl: '/pexels-enginakyurt-2673353.jpg' },
  { id: 5, imageUrl: '/pexels-marta-dzedyshko-1042863-2067473.jpg' },
  { id: 6, imageUrl: '/pexels-minan1398-1482803.jpg' },
  { id: 7, imageUrl: '/pexels-pixabay-262978.jpg' },
  { id: 8, imageUrl: '/pexels-pixabay-327158.jpg' },
  { id: 9, imageUrl: '/pexels-valeriya-1833349.jpg' },
  { id: 10, imageUrl: '/pexels-zvolskiy-1721932.jpg' },
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

    const eateriesData = mergeData(eateries.eateries, images);
    
    const {customerId} = useParams();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading eateries.</div>;
  }

  if (!eateries || eateries.length === 0) {
    return <div>No eateries available.</div>;
  }

  

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-base font-semibold leading-7 text-indigo-600">Welcome back</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Eateries are here!</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Order now your favorite food from the eateries here.
          </p>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Eateries</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {eateriesData.map((eatery) => (
              <Link to={`/eatery/${eatery.id}`} key={eatery.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={eatery.imageUrl}
                    alt={eatery.name || 'Image of eatery'}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{eatery.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    )
  }
  