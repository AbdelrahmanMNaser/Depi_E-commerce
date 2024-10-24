import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByCategory,
  setFilters as setReduxFilters,
} from "../redux/slices/ProductSlice";

const excludedFilters = [
  "_id",
  "title",
  "description",
  "keywords",
  "imageURLs",
  "stock",
  "features",
  "createdAt",
  "updatedAt",
];
const nameBasedFilters = ["category", "sub_category", "brand", "vendor"];

const Filter = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    setFilters({});
    // Reset price range when products change
    const prices = products.map((p) => p.unitPrice).filter(Number.isFinite);
    if (prices.length > 0) {
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);

  // Update Redux when filters state changes
  useEffect(() => {
    dispatch(setReduxFilters(filters));
  }, [filters, dispatch]);

  const handleCheckboxChange = useCallback((e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => ({
      ...(prevFilters || {}),
      [name]: checked
        ? (prevFilters || {})[name]
          ? [...(prevFilters || {})[name], value]
          : [value]
        : ((prevFilters || {})[name] || []).filter((item) => item !== value),
    }));
  }, []);

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    const newRange = [...priceRange];
    newRange[name === "min" ? 0 : 1] = parseInt(value, 10) || 0;
    setPriceRange(newRange);

    setFilters((prevFilters) => ({
      ...prevFilters,
      unitPrice: newRange,
    }));
  };

  const getUniqueValues = useMemo(
    () => (key) => {
      if (nameBasedFilters.includes(key)) {
        return Array.isArray(products)
          ? [...new Set(products.map((product) => product[key]?.name))]
          : [];
      } else {
        return Array.isArray(products)
          ? [
              ...new Set(
                products.flatMap((product) =>
                  product[key] &&
                  (typeof product[key] === "string" ||
                    typeof product[key] === "number")
                    ? [product[key]]
                    : Array.isArray(product[key])
                    ? product[key]
                    : []
                )
              ),
            ].filter(
              (value) => typeof value === "string" || typeof value === "number"
            )
          : [];
      }
    },
    [products]
  );

  const FilterSection = ({ filterKey, uniqueValues }) => (
    <div key={filterKey} className="mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
      </h3>
      {uniqueValues.map((value) => (
        <label key={value} className="block mb-1">
          <input
            type="checkbox"
            name={filterKey}
            value={value}
            onChange={handleCheckboxChange}
            checked={filters[filterKey] && filters[filterKey].includes(value)}
            className="mr-2"
          />
          {value}
        </label>
      ))}
    </div>
  );

  return (
    <div className="bg-slate-100">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      {status === "loading" && <p>Loading...</p>}

      {status === "succeeded" && Array.isArray(products) && (
        <div>
          {Object.keys(products[0] || {})
            .filter((key) => !excludedFilters.includes(key))
            .map((filterKey) => {
              const uniqueValues = getUniqueValues(filterKey);
              return filterKey === "unitPrice" ? (
                <div key={filterKey} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                    <input
                      type="number"
                      name="min"
                      value={priceRange[0]}
                      placeholder="Minimum Price"
                      onChange={handlePriceInputChange}
                      className="border px-2 py-1 w-full md:w-24"
                      min={priceRange[0]}
                      max={priceRange[1]}
                    />
                    -
                    <input
                      type="number"
                      name="max"
                      value={priceRange[1]}
                      placeholder="Maximum Price"
                      onChange={handlePriceInputChange}
                      className="border px-2 py-1 w-full md:w-24"
                      min={priceRange[0]}
                    />
                  </div>
                </div>
              ) : uniqueValues.length > 0 ? (
                <FilterSection
                  key={filterKey}
                  filterKey={filterKey}
                  uniqueValues={uniqueValues}
                />
              ) : null;
            })}
        </div>
      )}
    </div>
  );
};

export default Filter;
