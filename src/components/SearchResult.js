import axios from "axios";
import {useState,useEffect} from "react";
import ArticleCard from "./ArticleCard";
import ReactPaginate from "react-paginate";

const SearchResult=()=>{

    const [search,setSearch]=useState("");
    const [searchInput,setSearchInput]=useState("");
    
    const [articles,setArticles]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [pages,setPages]=useState(0);

    const [currentPage,setCurrentPage]=useState(0);


    const handlePageChange= e =>{
    setCurrentPage(e.selected);
    }

   const handleSubmit= e =>{
      e.preventDefault();
      setCurrentPage(0);
      setSearch(searchInput);
    }
   
    const inputHandleChange = e =>{
    setSearchInput(e.target.value);
   }


    useEffect(()=>{
        setIsLoading(true);
        const fetchData=async () =>{

            try{
                const {data} =await axios.get("https://hn.algolia.com/api/v1/search?",
                {
                    params:{page:currentPage, search},
                }
            );//fetch data according to the current page and search query 
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
    },[currentPage,search])
    
    
return(
    <div>
        
          <h1>HACKER NEWS</h1>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
             placeholder="Search"
             value={searchInput}
             onChange={inputHandleChange}
            />
            <button type="submit">Search</button>
          </form>
         <div className="list-container">
            {
                isLoading? <p> Loading ..... </p> : articles.map(article =><ArticleCard key={article.objectID} article={article}/>)
            }
         </div>
         {/*pagination*/}
         < ReactPaginate 
         nextLabel=">>"
         previousLabel="<<"
         forcePage={currentPage}
         pageCount={pages}
         renderOnZeroPageCount={null}
         onPageChange={handlePageChange}
         breakLabel="..."
         className="pagination"
         activeClassName="active-page"
         previousClassName="previous-page"
         nextClassName="next-page"

         />
    </div>
)
}
export default SearchResult;
