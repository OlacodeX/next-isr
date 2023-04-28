import Link from "next/link"

function ProductList({products}) {
    return <>
        <h1>List of products</h1>
        {
            products.map(product => {
                return (
                    <div key={product.id}>
                        {/* <product product={product} /> */}
                        <Link href={`products/${product.id}`}>
                            <h2>
                                {product.id} {product.title} 
                            </h2>
                        </Link>
                        <hr />
                    </div>
                )
            })
        }
    </>
}

export default ProductList

export async function getStaticProps() {
    console.log('Generating / Regenerating productlist')
    // make the API call
    const response = await fetch('http://localhost:4000/products')
    // convert the response to json
    const data = await response.json()
    // return an object of object holding the fetched data in a props object.
    return {
        props:{
            products: data
        },
        // revalidation is set to 10secs
        revalidate:10,
    }
}
