import "./App.css";
import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";
import { Provider } from "react-redux";
import store from "./store/rootStore";

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Provider>
  );
}

export default App;
