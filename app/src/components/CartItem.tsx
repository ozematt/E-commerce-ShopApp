import deleteIcon from "../assets/Delete.svg";
import { CartProduct, removeFromCart, updateCart } from "../redux/cartSlice";
import { AppDispatch, useAppDispatch } from "../redux/store";
import minus from "../assets/Minus.svg";
import plus from "../assets/Plus.svg";
import { useNavigate } from "react-router-dom";

const CartItem = ({
  id,
  title,
  image,
  category,
  price,
  purchaseTotal,
  quantity,
  shippingTime,
}: CartProduct) => {
  //
  ////DATA
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  ////LOGIC
  // increment item quantity
  const handleIncrementItemQuantity = (id: number, quantity: number) => {
    dispatch(
      updateCart({
        id: id,
        changes: { quantity: quantity + 1 },
      }),
    );
  };

  // decrement item quantity
  const handleDecrementItemQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(
        updateCart({
          id: id,
          changes: { quantity: quantity - 1 },
        }),
      );
    } else {
      dispatch(removeFromCart(id));
    }
  };

  // remove item
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div className="relative flex justify-between px-[14px] pt-[14px] sm:px-[24px] sm:pt-[24px]">
        {/* IMG */}
        <div className="flex">
          <img
            src={image}
            className="h-[99px] w-[99px] rounded-lg bg-grayBG object-contain lg:h-[124px] lg:w-[124px]"
            onClick={() => navigate(`/shop/${category}/${title}?id=${id}`)}
          />
          {/* product details */}

          <div className="flex flex-col justify-between pl-[16px]">
            {" "}
            <div>
              <h6 className="font-satoshi text-base font-bold lg:text-xl">
                {title}
              </h6>
              <p className="font-satoshi text-xs opacity-60 lg:text-sm">
                {shippingTime}
              </p>
            </div>
            <p className="font-satoshi text-xl font-bold lg:text-2xl">
              $ {purchaseTotal}{" "}
              <span className="hidden text-sm font-medium opacity-30 lg:block">
                For one: ${price}
              </span>
            </p>
          </div>
        </div>

        {/* handle quantity */}
        <div className="flex w-full max-w-[20px] flex-col items-end justify-between lg:max-w-[126px]">
          <img
            src={deleteIcon}
            alt=""
            onClick={() => handleRemoveFromCart(id)}
            className="cursor-pointer max-lg:absolute"
          />
          <div className="bottom-0 right-[14px] h-full max-h-[31px] w-full max-w-[105px] max-lg:absolute sm:right-[20px] lg:max-h-[44px] lg:max-w-[126px]">
            <button className="flex h-full w-full max-w-[110px] items-center justify-between rounded-full bg-grayBG px-4 font-satoshi font-medium max-md:text-sm md:max-w-[170px]">
              <img
                src={minus}
                alt="minus"
                width={20}
                height={20}
                onClick={() => handleDecrementItemQuantity(id, quantity)}
                className="md:scale-75"
              />
              <span className="text-sm lg:text-base">{quantity}</span>
              <img
                src={plus}
                alt="plus"
                width={20}
                height={20}
                onClick={() => handleIncrementItemQuantity(id, quantity)}
                className="md:scale-75"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-[14px] mt-[16px] border-b-[1px] sm:mx-[24px] sm:mt-[24px]" />
    </>
  );
};

export default CartItem;
