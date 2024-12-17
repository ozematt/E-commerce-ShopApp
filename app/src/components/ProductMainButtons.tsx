import { Product } from "../api/queries/products";
import QuantityButton from "./QuantityButton";

const ProductMainButtons = ({ shippingInformation, stock }: Product) => {
  //
  ////UI
  return (
    <div>
      <div className="my-6 border-b-2" />
      <p className="font-satoshi opacity-60">Shipping time:</p>
      <button className="mt-[16px] rounded-full bg-grayBG px-6 py-3 font-satoshi font-medium opacity-60 max-md:text-sm">
        {shippingInformation}
      </button>
      <div className="my-6 border-b-2" />
      <div className="flex h-[52px]">
        <QuantityButton stock={stock} />
        <button className="ml-[20px] w-full max-w-[400px] rounded-full bg-black px-6 py-3 font-satoshi font-medium text-white ring-1 hover:scale-95 max-md:text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductMainButtons;