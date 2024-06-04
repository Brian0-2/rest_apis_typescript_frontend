import { safeParse } from 'valibot';
import axios from 'axios';
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { toBoolean } from '../utils';

type ProductDataProps = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductDataProps) {

    try {
        const result = safeParse(DraftProductSchema,{
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price
            })
        }else{
            throw new Error("Datos no válidos");
        }
       
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error("Hay un error");
            
        }
    } catch (error) {
        console.log('Error')
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error("Hay un error");
            
        }
    } catch (error) {
        console.log('Error')
    }
}

export async function updateProduct(data : ProductDataProps, id : Product['id']) {
  try {

    const result = safeParse(ProductSchema, {
        id: id,
        name: data.name,
        price: +data.price,
        availability: toBoolean(data.availability.toString())
    })

    if(result.success){
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.put(url, result.output)
    }

  } catch (error) {
    console.log(error)
  }
}

export async function deleteProduct(id: Product['id']){

    try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url)
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url)
        
    } catch (error) {
        console.log(error)
    }
}