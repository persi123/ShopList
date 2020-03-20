import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./Component/AppNavbar";
import ShoppingList from "./Component/ShoppingList";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./Component/itemModel";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authAction";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
