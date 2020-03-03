import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import uuid from "uuid";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemAction";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  DeleteHandler(id) {
    this.props.deleteItem(id);
  }

  AddItem() {
    const name = prompt("enter name");
    console.log(name);
    if (name) {
      this.props.addItem(name);
    }
  }

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        {/* <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.AddItem}
        >
          AddItem
        </Button> */}

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.DeleteHandler(_id)}
                  >
                    Delete
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
// ShoppingList.propotype = {
//   getItems: PropTypes.func.isRequired,
//   item: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  item: state.item
});

// const mapDispatchToProps = dispatch => {
//   return {
//     PostData: data => dispatch(RecivingData(data)),
//     Delete: Postid => dispatch(DeletePost(Postid))
//   };
// };

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(
  ShoppingList
);
