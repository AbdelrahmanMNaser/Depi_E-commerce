import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByKeyword } from "../redux/slices/ProductSlice";
import Input from "./ui/Input";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(fetchProductsByKeyword(keyword));
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <div className="w-full md:w-1/2 px-4 py-2">
      <Input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
