import express, { json } from "express";
const app = express();
const port = 3000;

const db = [
  {
    cartid: "0",
    cartItems: [
      {
        productId: "3a9f1a05-390e-4109-8072-ac7a1caa7001",
        name: "A key ring",
        price: 0.85,
        quantity: 2,
      },
      {
        productId: "fe3e8d33-a0bc-4606-b1b3-eb59b645b94b",
        name: "Playing cards",
        price: 4.85,
        quantity: 4,
      },
    ],
    totalNumberOfItems: 6,
    totalPrice: 21.1,
  },
];

app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/carts", (req, res) => {
  res.json(db);
});

app.get("/api/carts/:cartId", (req, res) => {
  const cart = db.find((c) => c.cartid == req.params.cartId);
  res.json(cart);
});

app.post("/api/carts", (req, res) => {
  const newCart = {
    cartid: db.length.toString(),
    cartItems: [],
    totalNumberOfItems: 0,
    totalPrice: 0,
  };

  db.push(newCart);
  res.location(`/api/carts/${newCart.cartid}`);
  res.json(newCart);
});

app.post("/api/carts/:cartId/products", (req, res) => {
  const { productId, quantity } = req.body;
  const cart = db.find((c) => (c.cartid = req.params.cartId));
  cart?.cartItems.push({
    productId: productId,
    name: "Banana",
    description: "Yellow and bent",
    price: 1.32,
    quantity: quantity,
  });
  res.json(cart);
});

app.delete("/api/carts/:cartId", (req, res) => {
  const index = db.findIndex((c) => c.cartid == req.params.cartId);
  db.splice(index, 1);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
