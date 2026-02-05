import { faker } from "@faker-js/faker";

/**
 * Generates a large dataset of products
 */
export const generateProducts = (count = 10000) => {
  return new Array(count).fill().map((_, index) => ({
    id: index,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  }));
};
