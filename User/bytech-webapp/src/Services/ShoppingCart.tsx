import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const deleteShoppingItem = ({ itemId }:any) => {
    const deleteUrl = getApiUrl(`shoppingList/clean/${itemId}`)
    return axios.delete(deleteUrl, { withCredentials: true })
}
export const getShoppingList = ({ setProductList }:any) => {
    const listUrl = getApiUrl("shoppingList")
    axios.get(listUrl, { withCredentials: true }).then((response:any) => {
        setProductList(response.data)
    })
}
export const generateSale = () => {
    const saleUrl = getApiUrl(`sale/create`)
    return axios.post(saleUrl, null, { withCredentials: true })
}
export const getSaleList = ({ setSalesList }:any) => {
    const listUrl = getApiUrl("sale/client")
    axios.get(listUrl, { withCredentials: true }).then((response:any) => {
        setSalesList(response.data)
    })
}