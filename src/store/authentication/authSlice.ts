import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../../utils/browser-storage";
import { type User } from "../../types/auth";
import { compareHash } from "../../utils/crypto";
import { message } from "antd";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  counter: number;
};

const mockUsers: User[] = [
  {
    username: "shaikhadmin",
    email: "admin1@gmail.com",
    password:
      "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", // This should be hashed in a real application
    role: "admin",
  },
  {
    username: "shaikhuser",
    email: "user1@gmail.com",
    password:
      "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", // This should be hashed in a real application
    role: "user",
  },
  {
    username: "shaikh-school",
    email: "user2@gmail.com",
    password:
      "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", // This should be hashed in a real application
    role: "user",
  },
];

const localstoragestate = loadState<AuthState>("app-key-users");

const initialState: AuthState = localstoragestate || {
  isAuthenticated: false,
  user: null,
  users: mockUsers,
  counter: 0,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (user) => user.email === email && compareHash(user.password, password)
      );

      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    signup: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        password: string;
      }>
    ) => {
      const { username, email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);
      if (!existingUser) {
        const newUser: User = { username, email, password, role: "user" };
        state.users.push(newUser);
        state.isAuthenticated = true;
        state.user = newUser;
      } else {
        message.error("User already exists");
        new Error("User already exists");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      window.location.reload();
    },
  },
});

export const { increment, login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
