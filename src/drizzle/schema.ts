import { relations } from "drizzle-orm";
import { pgTable, text, integer, uuid, decimal } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  productId: uuid("productId").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price").notNull(),
});

export const carts = pgTable("carts", {
  cartId: uuid("cartId").defaultRandom().primaryKey().notNull(),
  totalNumberOfItems: integer("totalNumberOfItems").notNull(),
  totalPrice: decimal("totalPrice").notNull(),
});

export const cartProducts = pgTable(
  "cartProducts",
  {
    cartId: uuid("cartId").references(() => carts.cartId),
    productId: uuid("productId").references(() => products.productId),
    quantity: integer("quantity").notNull(),
  },
  (table) => ({
    primaryKey: [table.cartId, table.productId],
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
