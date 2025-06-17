import React, { useEffect, useState } from "react";
import axios from "axios";

interface Filters {
  keyword: string;
  brand: string;
  categories: string[];
  priceMin: string;
  priceMax: string;
  sort: string;
  limit: string;
  page: string;
}

const ProductFilter = () => {
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    brand: "",
    categories: [],
    priceMin: "",
    priceMax: "",
    sort: "",
    limit: "10",
    page: "1",
  });

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((cat) => cat !== categoryId)
      : [...filters.categories, categoryId];
    setFilters((prev) => ({ ...prev, categories: newCategories }));
  };

  const buildQuery = () => {
    const params = new URLSearchParams();

    if (filters.keyword) params.append("keyword", filters.keyword);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.page) params.append("page", filters.page);
    if (filters.priceMin) params.append("price[gte]", filters.priceMin);
    if (filters.priceMax) params.append("price[lte]", filters.priceMax);
    if (filters.categories.length > 0)
      filters.categories.forEach((cat) => params.append("category[in]", cat));

    params.append("fields", "title,price");

    return params.toString();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const query = buildQuery();
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?${query}`
      );
      console.log(res.data);
    };

    fetchProducts();
  }, [filters]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-gray-100 h-screen sticky top-0 overflow-auto space-y-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <input
          type="text"
          placeholder="Search..."
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          className="border rounded p-2 w-full"
        />

        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Brand</option>
          <option value="6212b6b488f2cee15c5db3c8">Brand A</option>
        </select>

        <div>
          <label className="block font-semibold mb-1">Price Range:</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters({ ...filters, priceMin: e.target.value })
              }
              className="border rounded p-2 w-1/2"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters({ ...filters, priceMax: e.target.value })
              }
              className="border rounded p-2 w-1/2"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Categories:</label>
          <div className="flex flex-col gap-1">
            <label>
              <input
                type="checkbox"
                value="6212b67488f2cee15c5db3ba"
                onChange={(e) => toggleCategory(e.target.value)}
              /> Category A
            </label>
            <label>
              <input
                type="checkbox"
                value="61f3157c6bdf4c518f9bbcb9"
                onChange={(e) => toggleCategory(e.target.value)}
              /> Category B
            </label>
          </div>
        </div>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="border rounded p-2 w-full"
        >
          <option value="">Sort by</option>
          <option value="-price">High to Low</option>
          <option value="price">Low to High</option>
        </select>
      </div>

      {/* Main Content (Product List placeholder) */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <p>Here you can render your product list based on the filters...</p>
      </div>
    </div>
  );
};

export default ProductFilter;
