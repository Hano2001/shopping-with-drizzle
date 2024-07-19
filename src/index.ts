import express, { json } from "express";
import { db } from "./drizzle/index.ts";
import { carts, products } from "./drizzle/schema.ts";

const app = express();
const port = 3000;

const database = [
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

app.get("/api/carts", async (req, res) => {
  const result = await db.query.carts.findMany();
  res.json(result);
});

app.get("/api/carts/:cartId", async (req, res) => {
  const id = req.params.cartId;
  const result = await db.query.carts.findFirst({
    where: (carts, { eq }) => eq(carts.cartId, id),
  });

  if (!result) {
    res.sendStatus(404);
  }

  res.json(result);
});

app.post("/api/carts", async (req, res) => {
  type NewCart = typeof carts.$inferInsert;
  const newCart: NewCart = {
    totalNumberOfItems: 0,
    totalPrice: "0",
  };
  const result = await db.insert(carts).values(newCart).returning();
  res.location(`/api/carts/${result[0].cartId}`);
  res.json(result);
});

app.post("/api/products", async (req, res) => {
  type NewProduct = typeof products.$inferInsert;
  const newProduct: NewProduct = req.body;

  const result = await db.insert(products).values(newProduct).returning();
  // name: text("name").notNull(),
  // description: text("description"),
  // price: decimal("price").notNull(),
  res.json(result);
});
app.post("/api/carts/:cartId/products", (req, res) => {
  const { name, description, price } = req.body;
  const cart = database.find((c) => (c.cartid = req.params.cartId));
  cart?.cartItems.push({
    productId: productId,
    name: "Banana",
    description: "Yellow and bent",
    price: 1.32,
  });

  // name: text("name").notNull(),
  // description: text("description"),
  // price: decimal("price").notNull(),
  res.json(cart);
});

app.delete("/api/carts/:cartId", (req, res) => {
  const index = database.findIndex((c) => c.cartid == req.params.cartId);
  database.splice(index, 1);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
