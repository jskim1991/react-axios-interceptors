import { useEffect, useState } from 'react'
import { get } from '../component/HttpClient'

const ProductDetailPage = () => {
    const [product, setProduct] = useState({})

    const fetchProduct = async (id) => {
        const url = `https://dummyjson.com/products/${id}`
        const data = await get(url)
        setProduct(data)
    }

    useEffect(() => {
        fetchProduct(1)
    }, [])

    return (
        <div className='App'>
            <div>{product.title}</div>
            <div>{product.description}</div>
        </div>
    )
}

export default ProductDetailPage
