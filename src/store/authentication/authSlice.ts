import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../../utils/browser-storage";

type User = {
  username: string;
  email: string;
  password: string; // This should be hashed in a real application
  role: 'admin' | 'user';
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  counter: number;
};

const mockUsers: User[] = [
  {
    username: 'shaikhadmin',
    email: 'omarshaikh4777@gmail.com',
    password: 'bjit1234', // This should be hashed in a real application
    role: 'admin',
  },
  {
    username: 'shaikh',
    email: 'omarshaikh47@gmail.com',
    password: 'bjit1234', // This should be hashed in a real application
    role: 'user',
  },
];

const localstoragestate = loadState<AuthState>("app-key");

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
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => user.email === email && user.password === password);
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    signup: (state, action: PayloadAction<{ username: string; email: string; password: string }>) => {
      const { username, email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);
      if (!existingUser) {
        const newUser: User = { username, email, password, role: 'user' };
        state.users.push(newUser);
        state.isAuthenticated = true;
        state.user = newUser;
      } else {
        new Error("User already exists");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { increment, login, signup, logout } = authSlice.actions;
export default authSlice.reducer;