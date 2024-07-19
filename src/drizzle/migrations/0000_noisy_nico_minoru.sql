CREATE TABLE IF NOT EXISTS "cartProducts" (
	"cartId" uuid,
	"productId" uuid,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"cartId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"totalNumberOfItems" integer NOT NULL,
	"totalPrice" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"productId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartProducts" ADD CONSTRAINT "cartProducts_cartId_carts_cartId_fk" FOREIGN KEY ("cartId") REFERENCES "public"."carts"("cartId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartProducts" ADD CONSTRAINT "cartProducts_productId_products_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("productId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;