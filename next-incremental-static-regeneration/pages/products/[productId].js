import { useRouter } from "next/router"

function Product({ product }) {
    const router = useRouter()

    // Even though with fallback set to true, next will generate pages for other paths not set at build time, it will do so at the first time that path is accessed hence the info to render the part below will not be available and may break our code which is a bad ux hence the if statement
    if (router.isFallback) { //i. if fallback is still true
        return <h1>Loading...</h1>  
    }

    return (
        <>
            <h2>
                {product.id} {product.title}
            </h2>
            <p>{product.description}</p>
        </>
    )
}

export default Product

export async function getStaticPaths() { 
    
    return {
        paths:[
            {
                params:{ productId:'1'}
            }
        ],
        fallback: true
    }
}


// The getstaticprops function accepts a parameter which by convention is called 'context'. This parameter is an object which we will destructure into params from which in our case we will get the product id we need to fetch.
export async function getStaticProps(context) {
    // Destructure parameter
    const { params } = context
    console.log(`Regenerating product ${params.productId}`)
    // make the API call
    const response = await fetch(`http://localhost:4000/products/${params.productId}`)
    // convert the response to json
    const data = await response.json()
    console.log(data)
    // return an object of object holding the fetched data in a props object.
    return {
        props:{
            product: data,
        },
        revalidate:10,
    }
}