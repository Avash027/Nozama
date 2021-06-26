import axios from 'axios';
import React ,{useEffect, useState} from 'react';

import { useSelector } from 'react-redux';

const OrderPanel = () => {

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;
    const [orders, setOrders] = useState([])


    

    useEffect(() => {
        const getOrders = async()=>{
           
            const data = await  getOrdersUtil(userInfo.token);

           if(data) setOrders(data);
        }

        getOrders();
    }, [userInfo])


    const updateDeliveryStatus = async (_id)=>{
        
        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + userInfo.token,
            },
          };


          const body = {
              _id,
              deliveryTime:new Date()
          }

          const {data}  =  await axios.put("/api/orders",body,config);

          

          const updatedOrders = [...orders];

          const index = updatedOrders.findIndex(order=>order._id === _id);

          updatedOrders[index] = data;

          setOrders(updatedOrders);

          

    }

    let ordersElements;

    if(orders.length===0) ordersElements=<h2>No orders</h2>
    else {
        ordersElements = (
            <>
            {
                orders.map(({orderItems,totalPrice , shippingAddress , user,createdAt , isDelivered , _id,deliveredAt})=>(
                    <div className="admin-panel">
                            <div className="admin-panel-element-up">
                                
                                <div className="admin-panel-names">
                                    Product Name
                                    <hr />
                                    {orderItems && orderItems.map(({name,qty})=>(
                                        <div className="">{`${name} (${qty})`}</div>
                                    )
                                    )}
                                </div>

                                
                                <div className="admin-panel-price">
                                Total Price
                                    <hr />
                                    Rs {totalPrice}</div>

                                

                            </div>

                            <div className="admin-panel-element-down">
                                
                                <div className="admin-panel-shipping-address">
                                    {`Shipping Address : ${shippingAddress.address}, ${shippingAddress.postalCode}, ${shippingAddress.city}, ${shippingAddress.country}`}
                                </div>
                                
                                {(userInfo && userInfo)&&<div className="admin-panel-user">
                                    {`User ID :  ${user}`}
                                </div>}
                                
                                <div className="admin-panel-orderedAt">
                                    {`Ordered At : ${createdAt}`}
                                </div>
                                    
                                <div className="admin-panel-delivered">
                                    Delivery Status :  {isDelivered?"Delivered":"Not yet Delivered"}
                                </div>

                                {(!isDelivered && userInfo && userInfo.isAdmin===true) && 
                                <div className="admin-panel-delivery-container" onClick={()=>updateDeliveryStatus(_id)}>
                                <i class="far fa-check-circle"></i> Order Delivered
                                </div>}

                                {isDelivered &&
                                <div className="admin-panel-delivery-date">
                                    {`Delivered on : ${deliveredAt}`}
                                </div>

                                }

                             
                            </div>
                
            </div>
                ))
            
    }
        </>
        )
    }

    return (
        <div>
            <div className="main-heading">
                Orders Status
            </div>
            <hr />
            {ordersElements}
        </div>
    )
}



const getOrdersUtil  =async(token)=>{

    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      };

    const {data} = await axios.get("/api/orders",config);
    
    return data;

}




export default OrderPanel
