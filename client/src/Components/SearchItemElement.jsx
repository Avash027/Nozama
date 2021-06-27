import React from 'react'

const SearchItemElement = ({product,redirectHandler}) => {
    return (
    <div
        key={product._id}
        className="search-item"
        onClick={e=>redirectHandler(product._id)}>
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
    )
}

export default SearchItemElement
