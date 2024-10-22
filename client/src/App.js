import { Provider } from "react-redux";
import "./App.css";
import Routing from "./Routing";
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <h1 className="text-center text-green-600">DEPI E-Commerce</h1>
      <Routing />
    </Provider>
  );
}

export default App;
