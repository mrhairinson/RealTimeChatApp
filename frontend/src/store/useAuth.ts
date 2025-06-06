/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { axiosIns } from "../libs/axios";

export const useAuth = create((set) => ({
  authUser: null, //Initially user auth is null
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, //Check auth every refresh page

  checkAuth: async() => {
    try {
        const res = await axiosIns.get("/auth/check-auth");
        set({authUser:res.data})
    } catch (error) {
        console.log(`Error in check auth: \n${error}`);
        set({authUser:null})
    } finally {
        set({isCheckingAuth:false})
    }
  }
}));
