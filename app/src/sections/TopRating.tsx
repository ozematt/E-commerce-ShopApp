import { useQuery } from "@tanstack/react-query";
import fetchProducts, {
  type Product as ProductT,
  ProductsFetchedData,
} from "../api/queries/products";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

const TopRating = () => {
  //
  ////DATA
  const navigate = useNavigate();

  const [productsToShow, setProductsToShow] = useState<ProductT[]>([]);

  // fetched products
  const { data, isPending } = useQuery<ProductsFetchedData>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  ////LOGIC
  //make four elements array
  useEffect(() => {
    if (productsToShow && data?.products && !isPending) {
      const products = data.products
        .filter((product) => product.rating >= 4.9)
        .slice(0, 4);
      setProductsToShow(products);
    }
  }, [data]);

  ////UI
  return (
    <section className="px-4 sm:px-[100px] mt-[50px] sm:mt-[72px] flex flex-col items-center w-full max-w-[1400px]">
      <h2 className="font-integralCFBold text-[32px] sm:text-5xl text-center">
        Top Rating
      </h2>

      <div className="max-xl:overflow-x-auto gap-4 sm:gap-5 flex max-sm:mt-[-32px] h-[420px] sm:mt-[55px]  w-full snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {" "}
        {productsToShow?.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 max-sm:mx-[-35px] scale-75 sm:scale-100 snap-start scrollbar-hide overflow-hidden"
          >
            <Product {...product} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/shop"), window.scrollTo(0, 0);
        }}
        className="cursor-pointer hover:scale-95 action:scale-100 px-[80px] py-[15px] border max-sm:w-full rounded-full  mt-[-30px] sm:mt-[36px]"
      >
        View All
      </button>
    </section>
  );
};

export default TopRating;
