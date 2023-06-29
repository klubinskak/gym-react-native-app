import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import NavigationComponent from "./navigation/NavigationContainer";




export default function App() {

  return (
    <Provider store={store}>
      <NavigationComponent/>
    </Provider>
  );
}
