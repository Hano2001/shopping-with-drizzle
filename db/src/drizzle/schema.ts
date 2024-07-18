import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  uuid,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core";

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

export const cartProducts = pgTable(
  "cartProducts",
  {
    cartId: uuid("cartId").references(() => carts.cartId),
    productId: uuid("productId").references(() => products.productId),
    quantity: integer("quantity"),
  },
  (table) => ({
    primaryKey: [table.cartId, table.productId],
    // cartProductKey: primaryKey({
    //   name: "cart_product_key",
    //   columns: [table.cartId, table.productId],
    // }),
  })
);

export const cartsRelations = relations(carts, ({ many }) => ({
  cartProducts: many(cartProducts),
}));

export const productsRelations = relations(products, ({ many }) => ({
  cartProducts: many(cartProducts),
}));

export const cartProductsRelations = relations(cartProducts, ({ one }) => ({
  carts: one(carts, {
    fields: [cartProducts.cartId],
    references: [carts.cartId],
  }),
  products: one(products, {
    fields: [cartProducts.productId],
    references: [products.productId],
  }),
}));
