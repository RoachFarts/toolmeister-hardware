
import Container from '@/components/Container'
import React from 'react'
import { ProductData } from '../../../../../type';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import FormattedPrice from '@/components/FormattedPrice';
import { MdStar } from 'react-icons/md';
import AddToCartButton from '@/components/AddToCartButton';
import ProductList from '@/components/ProductList';



const SingleProductPage = async ({params}:{params: Promise<{slug:string}>}) => {
    const slug = (await params).slug;
const query = groq`*[_type == "product" && slug.current == $slug][0]{
    ...}`;

    const product:ProductData = await client.fetch(query, {slug});

    return <Container className=' bg-bgLight'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4 '>
            <div className='overflow-hidden'>
                <Image src={urlFor(product?.image).url()} 
                alt={product?.title} 
                width={500} 
                height={500}
                className='w-full h-full object-cover'
                />
            </div>
            <div className='w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center'>
                <div className='flex flex-col gap-5'>
                    <h2 className='text-4xl font-semibold'>{product?.title}</h2>
                    <div className='flex items-center gap-4'>
                        <FormattedPrice amount={product?.rowprice} className='text-lightText line-through'/>
                        {" "}
                        <FormattedPrice amount={product?.price} className='text-darkOrange font-bold'/>
                        <p className='text-sm'>
                            you saved{" "}
                            <FormattedPrice 
                            amount={product?.rowprice - product?.price} 
                            className='bg-lightGreen text-white px-2 rounded-md text-xs py-1'
                            /> {" "} from this item
                        </p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='text-base text-lightText flex items-center pt-1'>
                            {Array?.from({length:5})?.map((_,i)=>{
                                const filled = i +1 <= Math.floor(product?.ratings);
                                const halfFilled = i +1 > Math.floor(product?.ratings) && i < Math.ceil(product?.ratings);
                                return (
                                    <MdStar className={`${filled ? "text-[#fa8900]":halfFilled? "text-yellow-300" : "text-lightText flex items-center"}`} key={i} />
                                )
                            })}
                        </div>
                        <p className='text-sm font-semibold text-accent/60 tracking-wide'>{`(5 customer reviews)`}</p>
                    </div>
                    <p className='text-sm tracking-wide text-gray-600'>
                        {product?.description}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Be the first to leave a review.
                    </p>
                    <AddToCartButton item={product} className='rounded-md py-3'/>
                </div>
            </div>
        </div>
        <div className='p-4'>
        <ProductList/>
        </div>
    </Container>
}

export default SingleProductPage