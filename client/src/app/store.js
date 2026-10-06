import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";


export const appStore = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware),
});


// smj to nhi aaya lekin yeh bol rha hai ki jaise hi refresh krte hai page ko to redux store ka data lost ho jaata hai, 
// aisa code likhenge jiski help se user refresh krega to yeh wala code execute hoga or uske pass user rhega
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true})); 
}
// page refresh krne se yeh wala code execute hoga
initializeApp();