
function ArticleListByCategory({ articles, category }) {
    return <>
                <h1>Showing News Articles for Category <i>{category}</i></h1>
                {
                    articles.map((article) => {
                        return (
                            <div key={article
                            .id}>
                                <h2>
                                    {article.id} {article.title} 
                                </h2>
                                <p>{article.description}</p>
                                <hr/>
                            </div>
                        )
                    })
                }
            </>
}

export default ArticleListByCategory

export async function getServerSideProps(context) {
    // we destructured the context parameter coming from the request(in the url), it will contain a params parameter inside which we will have the category which we passed to our url at request time.
    const { params } = context
    const { category } = params
    const response = await fetch(`http://localhost:4000/news?category=${category}`)
    const data = await response.json()

    return {
        props:{
            articles:data,
            category,
        },
    }
}