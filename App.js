import React from 'react';

class Header extends React.Component {
  changeScreen = () => {
    return this.props.goto(!this.props.val);
  }

  render(){
    let cls = "num-none";
    if(this.props.total > 0) {
      cls = "num";
    }
    return (
      <div className="header">
        <h1>Shopping Cart App</h1>
        <div className="nav-item">
          <button className="cart-head" onClick={this.changeScreen}><i className="fa fa-shopping-cart"></i><span className={cls}>{this.props.total.toString()}</span></button>
        </div>
      </div>
    );
  }
}

class Card extends React.Component {
  addItem = () => {
    return this.props.add(this.props.propID);
  }
  render(){
    return(
      <div className="card">
        <h2>T-Shirt {this.props.propID}</h2>
        <div className="text-part">
          <p>Lorem Ipsum is simply dummy text</p>
          <button className="cart" onClick={this.addItem}>Add to Cart</button>
        </div>
      </div>
    );
  }
}

class Cart extends React.Component {
  deleteItem(val) {
    return this.props.remove(val);
  }
  render(){
    let obj = this.props.items;
    if(Object.keys(obj).length > 0){
      var items = Object.keys(obj).map((key) => {
        return(
          <tr key={key}>
            <td>{key}</td>
            <td>{obj[key]}</td>
            <td><button onClick={() => this.deleteItem(key)}>Remove</button></td>
          </tr>
        );
      });
    }

    return(
      <div className="section-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
}


class ShoppingCart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      total: 0,
      cart: false,
      items: {}
    }
    this.AddToCart = this.AddToCart.bind(this);
    this.Change = this.Change.bind(this);
    this.RemoveItem = this.RemoveItem.bind(this);
  }

  Change(value) {
    this.setState({
      cart: value
    });
  }

  AddToCart(id) {
    /*
    This function adds an item to the cart based on it's ID
    if the item is already in the cart, increase its value rather than add it
    */
    const totalCart = this.state.total;
    const newCart = this.state.items;

    let key = id.toString();
    if(!newCart.hasOwnProperty(key)){
      newCart[key] = 1;
    } else {
      newCart[key] += 1;
    }
    
    this.setState({
      total: totalCart + 1,
      cart:false,
      items: newCart
    });
  }

  RemoveItem(val) {
    const newTotal = this.state.total - this.state.items[val];
    const newItems = this.state.items;
    delete newItems[val];
    this.setState({
      total: newTotal,
      cart: true,
      items: newItems
    });
  }
  render() {
    let page;
    if(this.state.cart) {
      page = <Cart items={this.state.items} remove={this.RemoveItem}/>;
    } else {
      page = (
      <div className="section">
        <Card propID={1} add={this.AddToCart}/>
        <Card propID={2} add={this.AddToCart}/>
        <Card propID={3} add={this.AddToCart}/>
        <Card propID={4} add={this.AddToCart}/>
      </div>
      );
    }
    return(
      <div>
        <Header total={this.state.total} goto={this.Change} val={this.state.cart}/>
        {page}
      </div>
    );
  }
}
function App() {
  return (
    <div>
      <ShoppingCart />
    </div>
  );
}

export default App;
