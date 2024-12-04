import { defineField, defineType } from "sanity";

export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Product Title",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options:{
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
        }),
        defineField ({
            name: "image",
            title: "Image",
            type: "image",
            options:{
                hotspot: true,
            },
        }),
        defineField ({
            name: "category",
            title: "Category",
            type: "array",
            of: [{type: "reference", to: [{type: "category"}]}],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "rowprice",
            title: "Row Price",
            type: "number",
        }),
        defineField ({
            name: "ratings",
            title: "Ratings",
            type: "number",
            description: "Product Ratings (1-5)",
        }),
        defineField ({
            name: "isnew",
            title: "New Arrival",
            type: "boolean",
        }),
        defineField ({
            name: "position",
            title: "Position",
            type: "string", 
        }),
        defineField ({
            name: "brand",
            title: "Brand",
            type: "string",
        }),
        defineField ({
            name: "quantity",
            title: "Quantity",
            type: "number",
        }),
    ],
    preview:{
        select:{
            title: "title",
            media: "image",
            position: "position",
        },
    },
});