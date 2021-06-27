import React ,{useState, useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { listProducts } from '../actions/productActions';
import Error from '../Components/Error';
import Loading from '../Components/Loading';


const SearchPage = ({history, match}) => {
    
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
  

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
     dispatch(listProducts());
      
    }, [dispatch])
    
   
    useEffect(() => {
    console.log(products)
      const filteredProducts = findProductsByName(products , match.params.query);
      setSearchResults(filteredProducts)
    }, [products])


    const redirectHandler = (_id)=>{
        history.push(`/product/${_id}`);
    }


    let searchedItems=<h1>Default</h1>;

    if(!products && error) searchedItems=<Error></Error>
    else if(products && products.length!==0){
        searchedItems=
        searchResults.map(product=>(
                                <div
                                key={product._id}
                                className="search-item"
                                onClick={e=>redirectHandler(product._id)}
                                >
                                    <div className="search-item-image-container">
                                        <img
                                        src={product.image}
                                        alt={product.brang}
                                        className="search-item-image" />
                                    </div>

                                    <div className="search-item-name">
                                        {product.name}
                                    </div>

                                    <div className="search-item-price">
                                        Rs {product.price}
                                    </div>
                                </div>
                            ))
        
        
    }
    else if(loading){
        searchedItems=<Loading></Loading>
    }
    else if(!loading && products.length===0)
    {
        searchedItems = <h2>No items found</h2>
    }


    return (
        <div>
            {searchedItems}
        </div>
    )

}


const findProductsByName = (products , query)=>{
    
    if(!query) return products
    const queryRegEx = new RegExp(query);
    return products.filter(product=>queryRegEx.test(product.name.toLowerCase()))

}

export default SearchPage
