import { useEffect, useState } from "react";
import { useGetFoodCategoriesQuery } from "../../app/services/catergoryApi";
import {
  useGetFoodItemQuery,
  useUpdateFoodItemMutation,
} from "../../app/services/foodItemApi";

export default function FoodItemDetails({
  eateryId,
  foodItemId,
  setEditFoodItem,
}) {
  // Fetch food categories and food item details
  const { data: categories } = useGetFoodCategoriesQuery();
  const {
    data: foodItem,
    isLoading: isFoodItemLoading,
    isError: isFoodItemError,
  } = useGetFoodItemQuery(foodItemId);
  const [updateFoodItem] = useUpdateFoodItemMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    available: "",
  });

  // Update formData when foodItem data is fetched
  useEffect(() => {
    if (foodItem) {
      setFormData({
        name: foodItem.foodItem.name || "",
        description: foodItem.foodItem.description || "",
        price: foodItem.foodItem.price || 0,
        categoryId: foodItem.foodItem.category_id || "",
        available: foodItem.foodItem.available || "Yes",
      });
    }
  }, [foodItem]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10) || 0,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFoodItem({
        eateryId,
        foodItemId,
        data: {
          ...formData,
          categoryId: formData.categoryId, // Ensure category is correctly set
          available: formData.available,
        },
      }).unwrap();
      if (setEditFoodItem) setEditFoodItem(false); // Close the edit form if a callback is provided
    } catch (err) {
      console.error("Failed to update food item", err);
    }
  };

  if (isFoodItemLoading) return <p>Loading food item...</p>;
  if (isFoodItemError) return <p>Error loading food item.</p>;

  return (
    <>
      <div className="mt-10 flex justify-start">
        <a href="#" onClick={()=>{setEditFoodItem(false)}} className="text-sm font-semibold leading-6 text-indigo-600">
          <span aria-hidden="true">&larr;</span>
          Go Back to Food Items
        </a>
      </div>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Edit Food Item
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              You can change the Food Item details here.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="available"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Available
                  </label>
                  <div className="mt-2">
                    <select
                      id="available"
                      name="available"
                      autoComplete="available-name"
                      value={formData.available}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      id="description"
                      name="description"
                      type="text"
                      autoComplete="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category-name"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {categories.foodCategories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      autoComplete="address-level2"
                      value={formData.price}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setEditFoodItem(false)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
