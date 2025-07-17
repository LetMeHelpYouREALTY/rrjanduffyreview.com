import { notFound } from "next/navigation";
import { Product } from "./types";

export async function getProduct(id: string) {
  const product = sampleProductsReviews[id] as Product;
  if (!product) {
    notFound();
  }
  return product;
}

// All sample product review data removed as the site is now real estate–focused.
