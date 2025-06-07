/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosIns } from "../libs/axios";
import type { IError, IMessage, IUser } from "../types/type";

interface IChatState {
  messages: Partial<IMessage>[];
  users: IUser[];
  selectedUser: IUser | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: IUser | null) => void;
  sendMessage: (messageData: Partial<IMessage>) => Promise<void>;
}

export const useChat = create<IChatState>()((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosIns.get("/message/users");
      set({ users: res.data });
    } catch (error: any) {
      const errObj: IError = error.response.data;
      console.log("Error in fetching users", errObj.message);
      toast.error(errObj.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosIns.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      const errObj: IError = error.response.data;
      console.log("Error in fetching messages", errObj.message);
      toast.error(errObj.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: async (selectedUser: IUser | null) => {
    set({ selectedUser: selectedUser });
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosIns.post(
        `/message/send/${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      const errObj: IError = error.response.data;
      console.log("Error in send message", errObj.message);
      toast.error(errObj.message);
    }
  },
}));
