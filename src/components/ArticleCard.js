const ArticleCard=({article})=>{
if(!article.title) return null;   
return(
    
    <div className="article-card-container">
        <h3>{article.title}</h3>
        <a href={article.url}>Read More ...</a>

    </div>
)
}
export default ArticleCard