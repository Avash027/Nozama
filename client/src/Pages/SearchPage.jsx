import React ,{useState, useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { listProducts } from '../actions/productActions';
import Error from '../Components/Error';
import Loading from '../Components/Loading';


const SearchPage = ({match}) => {
    
    
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
  

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
     
      
      console.log(products)
      const filteredProducts = findProductsByName(products , match.params.query);
      setSearchResults(filteredProducts)
    }, [])
    
   


    let searchedItems;

    if(!products && error) searchedItems=<Error></Error>
    else if(products && products.length!==0){
        searchedItems=
        searchResults.map(product=>(
                                <div key={product._id} className="search-item">
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
                                        {product.price}
                                    </div>
                                </div>
                            ))
        
        
    }
    else{
        searchedItems=<Loading></Loading>
    }


    return (
        <div>
            {searchedItems}
        </div>
    )

}


const findProductsByName = (products , query)=>{
    const queryRegEx = new RegExp(query);
    return products.filter(product=>queryRegEx.test(product.name.toLowerCase()))

}

export default SearchPage
