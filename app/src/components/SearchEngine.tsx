import { useEffect, useRef, useState } from "react";
import { useDebounce, useRedirectToProduct } from "../lib/hooks";
import { SelectedProduct } from "../lib/hooks/useRedirectToProduct";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/queries";
import { ProductsFetchedData } from "../api/queries/products";

type FilteredProduct = {
  id: number;
  title: string;
  category: string;
};

const SearchEngine = () => {
  //
  ////DATA
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<FilteredProduct[]>(
    [],
  );

  const { debouncedValue } = useDebounce(searchValue, 300); // debounce custom hook
  const { handleProductClick } = useRedirectToProduct(); // redirect to product details custom hook

  const ref = useRef<HTMLDivElement>(null);

  //fetch products date
  const { data } = useQuery<ProductsFetchedData>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  //creating products list for search engine
  const searchData =
    data?.products.map((product) => ({
      id: product.id,
      title: product.title,
      category: product.category,
    })) || [];

  ////LOGIC
  //set array of filtered products included debounced Value
  useEffect(() => {
    // protection against empty value
    if (debouncedValue.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    if (searchData.length > 0) {
      const filtered = searchData.filter((product) =>
        product.title.toLowerCase().includes(debouncedValue.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [debouncedValue]);

  //handle click outside search engine
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFilteredProducts([]); // clear filtered products array
        setSearchValue(""); // clear search value
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRedirectToProductDetails = (product: SelectedProduct) => {
    setSearchValue("");
    handleProductClick(product);
  };

  ////UI
  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder=" Search for products..."
        className="ml-[40px] mt-1 hidden h-[48px] w-full max-w-[577px] rounded-full bg-grayBG bg-lupe-icon bg-[center_left_1.5rem] bg-no-repeat pl-[57px] focus:outline-none focus:ring-1 focus:ring-black min-[838px]:block"
      />
      {filteredProducts.length > 0 ? (
        <div className="scrollbar-hide absolute inset-0 left-[60px] top-[53px] z-30 h-[100px] overflow-auto rounded-b-xl bg-grayBG opacity-80 ring-1 ring-black">
          <ul className="font-satoshi">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => handleRedirectToProductDetails(product)}
                className="cursor-pointer px-9 py-2 hover:bg-grayBG hover:brightness-110"
              >
                {product.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchEngine;