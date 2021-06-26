import React,{useState , useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import axios from "axios"
import Error from '../Components/Error';
import Loading from '../Components/Loading';
import { listProducts } from '../actions/productActions';


const ProductAdd = ({history}) => {

    const dispatch =useDispatch();

     const userLogin = useSelector(state => state.userLogin)
     const {userInfo} = userLogin;

     const productList = useSelector((state) => state.productList);
     const { loading, error, products } = productList;





    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [files, setFiles] = useState("");
    const [comment, setComment] = useState({});
    const [toaddProduct, setToaddProduct] = useState(true);

    useEffect(() => {
        dispatch(listProducts()); 
    }, [dispatch,comment])

    const submitHandler = async ()=>{

        try {
            const productToBeAdded ={
                user:userInfo._id,
                name,
                image:files,
                brand,
                category,
                description,
                reviews:[],
                price: Number(price),
                countInStock:Number(stock)
            };
    
            console.log(productToBeAdded)
    
            const token = userInfo.token;
            
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
                },
              };
    
    
            const {data} = await axios.post("/api/products/add",{productToBeAdded},config);
            
            console.log(data);
            alert("Product added successfully");
            history.push("/add");
    
            
        } catch (error) {
            alert("There was some error "+error.message);
        }
       
        


    }


    function convertImageToBase64(e){
        let file = e.target.files[0];

        if(file)
        {
            const reader = new FileReader();
            reader.onload = ()=>{
                setFiles(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const deleteProductHandler = async(productID)=>{
        const token = userInfo.token;
        
        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          };

          const body = {
              productID,
          }

          const {data} = await axios.post("/api/products/delete" , body,config);
          console.log(data)
          setComment(data);

    }


    let elemToBeRendered;

    if(toaddProduct){
        elemToBeRendered = (<div className="product-add" >
       
        <label className="product-add-label">Name</label>
        <br/>
        <input 
        type="text" 
        className="product-add-input" 
        placeholder="Product Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
        />
        
        <br />

        <label className="product-add-label">Brand</label>
        <br/>
        <input 
        type="text" 
        className="product-add-input" 
        placeholder="Product Brand"
        value={brand}
        onChange={(e)=>setBrand(e.target.value)}
        required
        />
        <br />

        <label className="product-add-label">Category</label>
        <br/>
        <input 
        type="text" 
        className="product-add-input" 
        placeholder="Product Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        required
        />
        <br />

        <label className="product-add-label">Description</label>
        <br/>
        <input 
        type="text" 
        className="product-add-input" 
        placeholder="Product Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        required
        />
        <br />

        <label className="product-add-label">Price</label>
        <br/>
        <input 
        type="text" 
        className="product-add-input" 
        placeholder="Product Price" 
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        required
        />
        <br />

        <label className="product-add-label">Current Stock</label>
        <br/>
        <input 
        type="text" 
        className="product-add-input" 
        placeholder="Product Stock"
        value={stock}
        onChange={(e)=>setStock(e.target.value)}
        required
        />
        <br />


        <input
        className="product-add-fileinput"
        type="file" 
        name="Upload the image" 
        id="imguploader"
        onChange={convertImageToBase64}
        />
        
        <button
        
        onClick={submitHandler}
        className="button button-primary">
            Add the product
        </button>  
    </div>)
    }
    else if(loading) elemToBeRendered=<Loading></Loading>
    else if(error) elemToBeRendered = <Error/>
    else {
        elemToBeRendered = (
            <div className="product-delete">
                {products.map(product=>(
                    <div
                    className="product-delete-item"
                    key={product._id}
                    >
                        <div className="product-delete-name">
                            {product.name}
                        </div>
                        <div className="product-delete-id">
                            {product._id}
                        </div>
                        <div
                        className="product-delete-button-container"
                        onClick={e=>deleteProductHandler(product._id)}
                        >
                            <div className="product-delete-button">
                            &times;
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }




    return (
        <>
        <div 
        className="toggleBar"
        onClick={(e)=>setToaddProduct(!toaddProduct)}
        >{toaddProduct?"Add Products":"Delete Products"}</div>
        {elemToBeRendered}
        </>
    )
}

export default ProductAdd
