import axios from "axios";
import { ProductFormData } from "./type";
import { productList } from "../ProductList/ProductList";

const api = axios.create({
    baseURL: "/api", // Adjust based on your API URL
});

export const addProduct = async (data: ProductFormData) => {
    //   const response = await api.post("/products", data);
    console.log("addProduct-data",data);
    return {};
};

export const editProduct = async (data: ProductFormData, id:string) => {
    return {};
}
export interface ProductType {
    id: string;
    name: string;
    // Add other fields if needed
}

export const getProductTypes = async (searchQuery?: string): Promise<ProductType[]> => {
    // const response = await axios.get(`/api/product-types${searchQuery ? `?search=${searchQuery}` : ''}`);
    // return response.data;
    return [{
        id: '1',
        name: "Laptop"
    },
    {
        id: '2',
        name: "Chair"
    },
    {
        id: '3',
        name: "Carpet"
    }
    ]
};

export const getProducts = async (searchQuery?: string) => {
    return productList
}