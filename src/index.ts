import express, { json } from "express";
const app = express();
const port = 3000;

const db = [
  {
    cartid: "82479462-af95-4b88-bcef-4bf8f4261a4a",
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
