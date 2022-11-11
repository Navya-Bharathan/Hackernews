import axios from "axios";
import {useState,useEffect} from "react";
import ArticleCard from "./ArticleCard";

const Search=()=>{

    const [search,setSearch]=useState("");
    const [articles,setArticles]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [pages,setPages]=useState(0);

    useEffect(()=>{
        setIsLoading(true);
        const fetchData=async () =>{

            try{
                const {data} =await axios.get("https://hn.algolia.com/api/v1/search?");
                console.log(data)
                const {hits,nbPages}=data; // destructure the data and get the no of hits,pages
                setArticles(hits);     //set data in each page
                setPages(nbPages);   //set the total no of pages
            }
            catch(err){

                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchData();
    },[])
    

return(
    <>
          <div>Search bar</div>
          <h1>HACKER NEWS</h1>
         <div className="list-container">
            {
                isLoading? <p> Loading ..... </p> : articles.map(article =><ArticleCard key={article.objectID} article={article}/>)
            }
         </div>
    </>
)
}
export default Search;
