export type User = {
    username: string;
    email: string;
    password: string; // This should be hashed in a real application
    role: 'admin' | 'user';
  };