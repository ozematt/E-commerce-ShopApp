import { useEffect, useState } from "react";
import { Footer, Newsletter } from "../sections";

import { Breadcrumbs } from "./";
import fetchUserData, { UserAddress } from "../api/queries/user";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Checkout = () => {
  //
  ////DATA
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);

  const total = useSelector((state: RootState) => state.cart.total);

  console.log(userAddress);

  const authUserData = localStorage.getItem("user");

  ////LOGIC
  const mutation = useMutation({
    mutationFn: fetchUserData,
    onError: () => {
      console.log("Cannot fetch user data");
    },
    onSuccess: (data) => {
      const userAddress = data.address;
      setUserAddress(userAddress);
    },
  });

  useEffect(() => {
    if (authUserData) {
      const user = JSON.parse(authUserData);
      const userId = user.id;
      mutation.mutate(userId);
    }
  }, [authUserData]);

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
            {/* cart items */}
            <div className="h-full max-h-[505px] w-full rounded-[20px] ring-1 ring-black ring-opacity-10 min-[1454px]:max-w-[715px]"></div>
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
