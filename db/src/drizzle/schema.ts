import { relations } from "drizzle-orm";
import { pgTable, text, integer, uuid, decimal } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  productId: uuid("productId").defaultRandom().primaryKey(),
  name: text("name"),
  description: text("description"),
  price: decimal("price"),
});

export const carts = pgTable("carts", {
  cartId: uuid("cartId").defaultRandom().primaryKey(),
  totalNumberOfItems: integer("totalNumberOfItems"),
  totalPrice: decimal("totalPrice"),
});

export const cartItems = pgTable("cartItems", {
  cartId: uuid("cartId").references(() => carts.cartId),
  productId: uuid("productId").references(() => products.productId),
  quantity: integer("quantity"),
});

export const cartsRelations = relations(carts, ({ many }) => ({
  cartItems: many(cartItems),
}));

export const productsRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
}));
