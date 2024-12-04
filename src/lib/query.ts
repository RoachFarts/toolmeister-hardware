import { groq } from "next-sanity";

const bannerQuery = groq`*[_type == "banner"]{
    ...
} | order(_createdAt asc)`;

const productsQuery = groq`*[_type == "product"]{
    ...
} | order(_createdAt asc)`;

const bestSellersQuery = groq`*[_type == "product" && postition == 'Bestsellers']{
    ...
} | order(_createdAt asc)`;

export { bannerQuery, productsQuery, bestSellersQuery };