export function loadState<T>(key: string): T | undefined {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (e) {
    return undefined;
  }
}

export async function saveState<T>(state: T, key: string): Promise<void> {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.log(e, "Error saving the state");
  }
}



// interface AppState {
//     user: { name: string; email: string };
//     loggedIn: boolean;
//   }
  
//   // Load state
//   const state = loadState<AppState>();
  
//   // Save state
//   const newState: AppState = {
//     user: { name: "John Doe", email: "john@example.com" },
//     loggedIn: true,
//   };
//   saveState(newState);
  