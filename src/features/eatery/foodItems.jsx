import { PencilIcon } from "@heroicons/react/20/solid";
import {
  useGetFoodItemsQuery,
  useGetFoodItemQuery,
} from "../../app/services/foodItemApi";
import { useState } from "react";
import FoodItemDetails from "./foodItemDetails";

export default function FoodItems({ eateryId }) {
  // Fetch food items using the API hook
  const {
    data: foodItems,
    isLoading,
    isError,
  } = useGetFoodItemsQuery({ eateryId });
  const [editFoodItem, setEditFoodItem] = useState(false);
  const [foodItemId, setFoodItemId] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading food items.</p>;

  const handleEditFoodItem = (id) => {
    setEditFoodItem(true);
    setFoodItemId(id);
  };

  return (
    <div>
      {editFoodItem && (
        <FoodItemDetails
          eateryId={eateryId}
          foodItemId={foodItemId}
          setEditFoodItem={setEditFoodItem}
        />
      )}
      {!editFoodItem && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {foodItems.foodItems.map((item) => (
            <li
              key={item.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {item.role}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
                <img
                  alt=""
                  src={item.imageUrl}
                  className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <span className="text-gray-900">
                        {"₹ "}
                        {item.price}
                      </span>
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href="#"
                      onClick={() => handleEditFoodItem(item.id)}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-indigo-600"
                    >
                      <PencilIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-white"
                      />
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
