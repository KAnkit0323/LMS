import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckoutSession,
    { isLoading },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      const { data } = await createCheckoutSession(courseId);

      if (!data?.success) {
        return;
      }

      const options = {
        key: data.keyId,

        amount: data.amount,

        currency: data.currency,

        name: "AKMeel Coaching",

        description: "Course Purchase",

        order_id: data.orderId,

        handler: function (response) {
          console.log("Payment successful");

          console.log("Payment ID:", response.razorpay_payment_id);

          console.log("Order ID:", response.razorpay_order_id);

          console.log(
            "Signature:",
            response.razorpay_signature
          );
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      className="w-full"
      disabled={isLoading}
      onClick={purchaseCourseHandler}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;



















// import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { useEffect } from "react";

// const BuyCourseButton = ({ courseId }) => {
//   const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] =
//     useCreateCheckoutSessionMutation();

//   const purchaseCourseHandler = async () => {
//     await createCheckoutSession(courseId);
//   };

//   useEffect( () => {
//     if( isSuccess ) {
//       if( data?.url ) {
        
//       }
//     }
//   } ,[])

//   return (
//     <Button
//       className="w-full"
//       disabled={isLoading}
//       onClick={purchaseCourseHandler}
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;
