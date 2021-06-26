import React , {useState , useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios';

import { removeFromCartAll } from '../actions/cartActions';

const ShippingPage = ({history}) => {


    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState(0);

    const placeOrderHandler = async ()=>{
        if(address.length===0 ||city.length===0 ||country.length===0||postalCode.length===0)
        {
            alert("Invalid address")
            return;
        }

        const[, error] =  await PlaceOrder(address,city,postalCode,country , userInfo , cartItems , price)
        const [ , error1] = await updateProductsQty(cartItems);
        
        if(error || error1)
        {
            alert("Something went wrong... Please try again in some time");
            return;
        }
        
        dispatch(removeFromCartAll());
        alert("Orders placed successfully");
        history.push("/");
        
   
}

useEffect(() => {
    let totalPrice=0;
    for(let i=0;i<cartItems.length;i++) totalPrice+=(cartItems[i].price*cartItems[i].qty);
    totalPrice = totalPrice.toFixed(3);
    setPrice(totalPrice);


}, [])

    return (
        <div className="shipping">
            

            <div className="shipping-container">

                <div className="shipping-container-userinfo">
                <div className="main-heading">
                Fill the shipping details
            </div>
            

            
                <label className="shipping-label">
                Address
                </label>
                <br />
                <input
                type="text"
                className="shipping-input" 
                placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />

                <br />

            <label className="shipping-label">
                City
            </label>
            <br />
            <input 
            type="text" 
            className="shipping-input" 
            placeholder="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            />

            <br />

            <label className="shipping-label">
                Postal Code
            </label>
            <br />
            <input 
            type="text" 
            className="shipping-input" 
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e)=>setPostalCode(e.target.value)}
            />
            
            <br />

            <label className="shipping-label">
                Country
            </label>
            <br />
            <input 
            type="text" 
            className="shipping-input" 
            placeholder="Country"
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            />

            <br />

                </div>
                
                <div className="shipping-cotainer-billing" style={{textAlign:'center'}}>
                    <div className="main-heading">
                        Billing
                    </div>
                    <div className="shipping-billing-layout">

                    <div className="shipping-item-name-heading">
                        Product   
                    </div>
                    
                    <div className="shipping-item-qty-heading">
                        Quantity
                    </div>
                    <div className="shipping-item-price-heading">
                        Price
                    </div>
            
                {cartItems.map(item=>(
                    <React.Fragment key={item.product}>
                    <div className="shipping-itemname" key={item.product}>{item.name}</div>
                    <div className="shipping-itemqty">{item.qty}</div>
                    <div className="shipping-itemprice">Rs {(item.qty * item.price)}</div>
                    </React.Fragment>
                ))}
                </div>

                <div className="button-container" style={{marginTop:"2rem"}}>

                <button
                href="#" 
                className="button button-primary"
                onClick={(e)=>placeOrderHandler()}
                >Place Rs {`${price}`}</button>    
                
                </div>
                
                </div>

            
            </div>
            
        </div>
    )
}


const PlaceOrder = async (address, city, postalCode, country , userInfo,cartItems,totalPrice) => {

    

    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      };
  
      const orderItem = {
        user: userInfo._id,
        orderItems: cartItems.map(({ qty, product,name,image }) => {
          return { qty, product,name,image };
        }),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        totalPrice: totalPrice,
        isDelivered: false,
        orderedAt: new Date(),
      };


     
  
      const {data} =  await axios.post("/api/orders", { orderItem: orderItem }, config);

      return [data , null];
    } catch (error) {
    
        return [null,error];

    }
  };


const updateProductsQty = async(cartItems)=>{

    try {
        const updateItems = cartItems.map(item=>{
            return {qty:item.qty , productID:item.product}
        });
    
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
      
          const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + token,
            },
          };
    
          const body = {
              updateItems
          };
    
          const {data} = await axios.post("/api/products/updateQty",body,config);
          
          return [data, null];
        
    } catch (error) {
            return [null,error];
    }
    

}

export default ShippingPage
