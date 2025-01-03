import { useEffect, useId, useState } from "react";
import { Footer, Newsletter } from "../sections";
import { Breadcrumbs } from "./";
import fetchUserData, { type UserAddress } from "../api/queries/user";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { format } from "date-fns";
import { CartProduct } from "../redux/cartSlice";

type UserData = {
  name: string;
  surname: string;
  address: UserAddress;
};

type Item = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type OrderData = {
  id: string;
  date: string;
  totalPrice: number;
  items: Item[];
};

const Checkout = () => {
  //
  ////DATA
  const [userData, setUserData] = useState<UserData | null>(null);

  const [order, setOrder] = useState<OrderData | null>(null);
  console.log(order);

  const total = useSelector((state: RootState) => state.cart.total); //total price (included discount)

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      const items = cartData.entities;
      let itemsArray = [];
      for (let key in items) {
        itemsArray.push(items[key]);
      }
      // console.log(itemsArray);
      const order: OrderData = {
        id: orderId,
        items: itemsArray.map((item: CartProduct) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        date: formatDate(),
        totalPrice: cartData.total,
      };

      setOrder(order);
    }
  }, []);

  ////LOGIC
  const mutation = useMutation({
    mutationFn: fetchUserData, //
    onError: () => {
      console.log("Cannot fetch user data");
    },
    onSuccess: (data) => {
      //create user data
      const userAddress = {
        name: data.firstName,
        surname: data.lastName,
        address: data.address,
      };
      setUserData(userAddress); //add user data to state
    },
  });

  useEffect(() => {
    const authUserData = localStorage.getItem("user");
    if (authUserData) {
      const user = JSON.parse(authUserData);
      const userId = user.id;
      mutation.mutate(userId);
    }
  }, []);

  // date-fns
  const formatDate = () => {
    const today = new Date();
    return format(today, "dd.MM.yyyy");
  };

  // unique id
  const orderId = useId();

  const handleOrder = () => {};

  ////UI
  return (
    <>
      <section className="max-container px-4 sm:px-[100px]">
        {" "}
        <Breadcrumbs />
        <div>
          <h2 className="mt-[8px] font-integralCFBold text-[32px] max-md:leading-[36px] sm:mt-[24px] sm:text-5xl">
            Finalization
          </h2>
          <div className="mt-[20px] flex flex-wrap justify-center gap-[20px] sm:mt-[24px]">
            <div className="h-full max-h-[505px] w-full rounded-[20px] ring-1 ring-black ring-opacity-10 min-[1454px]:max-w-[715px]">
              <div className="px-6 pb-[33px] pt-[20px]">
                <h6 className="pb-1 font-satoshi text-xl font-bold sm:text-2xl">
                  Shipping recipient details:
                </h6>
                <div className="border-b-[1px] pt-5" />
                {/* Address */}
                <div className="mt-4 space-y-1 font-satoshi text-sm">
                  <p className="pb-1 text-xl font-bold">{` ${userData?.name}  ${userData?.surname}`}</p>
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {userData?.address?.city}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {userData?.address?.address}
                  </p>
                  <p>
                    <span className="font-medium">Postal Code:</span>{" "}
                    {userData?.address?.postalCode}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span>{" "}
                    {userData?.address?.country}
                  </p>
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {userData?.address?.state}
                  </p>
                </div>
              </div>
            </div>
            {/* SUMMARY */}
            <div className="w-full max-w-[805px] rounded-[20px] ring-1 ring-black ring-opacity-10 min-[1454px]:max-w-[505px]">
              <div className="px-6 pb-[33px] pt-[20px]">
                <h6 className="pb-1 font-satoshi text-xl font-bold sm:text-2xl">
                  Total Payable Amount
                </h6>
                <div>
                  <div className="flex justify-between pt-5">
                    <p className="font-satoshi text-base opacity-60 sm:text-xl">
                      Total Price{" "}
                    </p>{" "}
                    <p className="font-satoshi text-base font-bold sm:text-xl">
                      ${total}
                    </p>
                  </div>
                  <div className="border-b-[1px] pt-5" />

                  <button className="relative mt-6 w-full max-w-[457px] rounded-full bg-black py-[19px] font-satoshi font-medium text-white transition duration-100 ease-in-out hover:scale-95 max-sm:text-sm">
                    PAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-container">
        {" "}
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
