
// below, I can pass the entire props to the component (without the {}) and then destructure it before using. This is useful if I have more than one set of data that the props object is returning. However in this case, it's just the articles so I can destructure directly and pass just the articles to the component.
function NewsArticleList({ articles }) {
    return <>
                <h1>List of News Articles</h1>
                {
                    articles.map((article) => {
                        return (
                            <div key={article
                            .id}>
                                <h2>
                                    {article.id} {article.title} - {article.category}
                                </h2>
                            </div>
                        )
                    })
                }
            </>
}

export default NewsArticleList

export async function getServerSideProps() {
    const response = await fetch('http://localhost:4000/news')
    const data = await response.json()

    return {
        props:{
            articles:data,
        },
    }
}