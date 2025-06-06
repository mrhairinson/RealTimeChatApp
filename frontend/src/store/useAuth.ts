/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { axiosIns } from "../libs/axios";
import type { ISignUpData, IUser } from "../types/type";

interface IAuthState {
  authUser: Partial<IUser>|null; // User authentication data
  isSigningUp: boolean; // Indicates if the user is signing up
  isSigningIn: boolean; // Indicates if the user is signing in
  isUpdatingProfile: boolean; // Indicates if the user profile is being updated
  isCheckingAuth: boolean; // Indicates if authentication status is being checked

  checkAuth: () => Promise<void>; // Function to check authentication status
}

export const useAuth = create<IAuthState>()((set) => {
  return {
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
    },

    signUp: async(data:ISignUpData) => {
      try {
          await axiosIns.post("/auth/signup");
      } catch (error) {
          console.log(`Error in sign up: \n${error}`);
      } finally { }
    }
  }
});
