import { PRODUCTS } from "../constants";
import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  rating: z.number(),
  category: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  discountPercentage: z.number(),
  brand: z.string().optional(),
  weight: z.number(),
  stock: z.number(),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
  }),
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  reviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string(),
      date: z.string(),
      reviewerName: z.string(),
      reviewerEmail: z.string(),
    })
  ),
});

export type Product = z.infer<typeof productSchema>;

const productsFetchedDataSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductsFetchedData = z.infer<typeof productsFetchedDataSchema>;

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${PRODUCTS}?limit=0&&select=id,title,price,rating,category,images,thumbnail,discountPercentage,weight,stock,dimensions,warrantyInformation,shippingInformation,reviews,brand,description,`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products: unknown = await response.json();
    const validateProducts = productsFetchedDataSchema.safeParse(products);

    if (!validateProducts.success) {
      console.error("Validation error:", validateProducts.error);
      throw new Error("Validation failed: " + validateProducts.error);
    }
    const validProducts: ProductsFetchedData = validateProducts.data;
    return validProducts;
  } catch (error) {
    console.error("There has been a problem with fetch", error);
    throw error;
  }
};

export default fetchProducts;
