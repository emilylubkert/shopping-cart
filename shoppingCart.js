
function ShoppingCart({ stockitems }) {
    const [cart, setCart] = React.useState([]);
    const [stock, setStock] = React.useState(stockitems);
    const { Button } = ReactBootstrap;
   
    const moveToCart = e => {
      let [name, num] = e.target.innerHTML.split(":");
  
      let newStock = stock.map(item => {
        if (item.name == name && item.instock > 0) item.instock--;
        return item;
      });
      setStock(newStock);
  
      let newCart = [];
      if (num > 0) {
        newCart = [...cart, name];
      }else if (num <= 0) return;
      
      setCart(newCart);
    };
    const updatedList = stock.map((item, index) => {
      return (
        <Button onClick={moveToCart} key={index}>
          {item.name}:{item.instock}
        </Button>
      );
    });

    const removeFromCart = ((e, cart) => {
        let deletedItemIndex = e.target.getAttribute("value");
        const removedItemCart = cart.filter((item,index) => index != deletedItemIndex)
        setCart(removedItemCart);

        let deletedItem = e.target.innerHTML;
        console.log(deletedItem);
        const updatedStock = stock.map(item => {
            if(item.name === deletedItem) item.instock++;
            return item;
        });
       setStock(updatedStock);

    });
  
    const updatedCart = cart.map((item, index) => {
      return (
        <Button onClick={e => removeFromCart(e, cart)} value={index} key={index}>{item}</Button>
      );
    });

    return (
      <>
        <ul style={{ listStyleType: "none" }}>{updatedList}</ul>
        <h1>Shopping Cart</h1>
        <ul style={{ listStyleType: "none" }}>{updatedCart}</ul>
      </>
    );
  }
  const produce = [
    { name: "apple", instock: 2 },
    { name: "pineapple", instock: 3 },
    { name: "pear", instock: 0 },
    { name: "peach", instock: 3 },
    { name: "orange", instock: 1 }
  ];
  ReactDOM.render(
    <ShoppingCart stockitems={produce} />,
    document.getElementById("root")
  );
  