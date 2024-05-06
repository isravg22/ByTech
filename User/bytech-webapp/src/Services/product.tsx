import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const getAllProducts = ({ setProductList }:any) => {
    const productUrl = getApiUrl("product/all")
    axios.get(productUrl, { withCredentials: true }).then((response) => {
        setProductList(response.data)
    })
}
export const getBestProducts = ({ setBestProductList }:any) => {
    const productUrl = getApiUrl("product/best")
    axios.get(productUrl, { withCredentials: true }).then((response) => {
        setBestProductList(response.data)
    })
}
export const saveProduct = ({ product, edit }:any) => {
    const productUpdateUrl = getApiUrl("product/update")
    const productCreateUrl = getApiUrl("product/create")
    return edit === true ? axios.put(productUpdateUrl, product, { withCredentials: true })
        : axios.post(productCreateUrl, product, { withCredentials: true })
}
export const getProductById = async (id:any) => {
    const productUrl = getApiUrl(`product/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}
