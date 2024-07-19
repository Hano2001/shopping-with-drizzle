import express, { json } from "express";
import { db } from "./drizzle/index.ts";
import { carts, products } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;
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

  res.json(result);
});

app.post("/api/carts/:cartId/products", async (req, res) => {
  console.log(res, req);
});

app.delete("/api/carts/:cartId", async (req, res) => {
  const id = req.params.cartId;
  await db.delete(carts).where(eq(carts.cartId, id));
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
