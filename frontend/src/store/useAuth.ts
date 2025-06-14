/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosIns } from "../libs/axios";
import type {
  IError,
  ISignInData,
  ISignUpData,
  IUpdateProfileData,
  IUser,
} from "../types/type";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";

interface IAuthState {
  authUser: IUser | null; // User authentication data
  isSigningUp: boolean; // Indicates if the user is signing up
  isSigningIn: boolean; // Indicates if the user is signing in
  isUpdatingProfile: boolean; // Indicates if the user profile is being updated
  isCheckingAuth: boolean; // Indicates if authentication status is being checked
  onlineUsers: string[];
  socket: Socket | null;

  checkAuth: () => Promise<void>; // Function to check authentication status
  signUp: (data: ISignUpData) => Promise<void>;
  signIn: (data: ISignInData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: IUpdateProfileData) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuth = create<IAuthState>()((set, get) => {
  return {
    authUser: null, //Initially user auth is null
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true, //Check auth every refresh page
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
      try {
        const res = await axiosIns.get("/auth/check-auth");
        set({ authUser: res.data });
        get().connectSocket();
      } catch (error) {
        console.log(`Error in check auth: \n${error}`);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signUp: async (data: ISignUpData) => {
      set({ isSigningUp: true }); //Start loading signup
      try {
        const res = await axiosIns.post("/auth/signup", data);
        set({ authUser: res.data }); //Set authUser to trigger nativate to "/"
        toast.success("Sign up successfully");
        get().connectSocket();
      } catch (error: any) {
        const errObj: IError = error.response.data;
        console.log(`Error in sign up: \n${errObj}`);
        toast.error(errObj.message);
      } finally {
        set({ isSigningUp: false }); //Close loading sign up
      }
    },

    signIn: async (data: ISignInData) => {
      set({ isSigningIn: true }); //Start loading sign in
      try {
        const res = await axiosIns.post("/auth/signin", data);
        set({ authUser: res.data }); //Set authUser to trigger nativate to "/"
        toast.success("Sign in successfully");
        get().connectSocket();
      } catch (error: any) {
        const errObj: IError = error.response.data;
        console.log(`Error in sign in: \n${errObj}`);
        toast.error(errObj.message);
      } finally {
        set({ isSigningIn: false }); //Close loading sign in
      }
    },

    signOut: async () => {
      try {
        await axiosIns.post("/auth/signout");
        toast.success("Sign out successfully");
        get().disconnectSocket();
      } catch (error: any) {
        const errObj: IError = error.response.data;
        console.log(`Error in sign in: \n${errObj}`);
        toast.error(errObj.message);
      } finally {
        set({ authUser: null }); //remove auth user
      }
    },

    updateProfile: async (data: IUpdateProfileData) => {
      set({ isUpdatingProfile: true }); //Start loading
      try {
        const res = await axiosIns.put("/auth/update-profile", data);
        set({ authUser: res.data }); //Set authUser to trigger nativate to "/"
        toast.success("Update Profile Successfully");
      } catch (error: any) {
        const errObj: IError = error.response.data;
        console.log(`Error in sign in: \n${errObj}`);
        toast.error(errObj.message);
      } finally {
        set({ isUpdatingProfile: false }); //Close loading
      }
    },

    connectSocket: () => {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });
      socket.connect();

      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => { //listen to "getOnlineUsers" event
        set({ onlineUsers: userIds });
      });
    },

    disconnectSocket: () => {
      if (get().socket?.connected) get().socket?.disconnect();
    },
  };
});
