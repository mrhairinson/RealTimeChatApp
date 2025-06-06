export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISignUpData {
  email: string;
  fullName: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IError {
  statusCode: number;
  errorCode: string;
  message: string;
}
