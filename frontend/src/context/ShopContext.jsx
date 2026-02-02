import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const [isCartLoading, setIsCartLoading] = useState(true);
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
                toast.success("Added to cart");
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data?.message || error.message || "Failed to add to cart")
            }
        } else {
            // Save cart to localStorage for non-logged in users
            localStorage.setItem('guestCart', JSON.stringify(cartData));
            toast.success("Added to cart");
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        try {
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
            }
        } catch (error) {
            console.error("Error calculating cart count:", error);
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        try {
            let cartData = structuredClone(cartItems);

            if (quantity <= 0) {
                // Remove the item completely if quantity is 0
                if (cartData[itemId] && cartData[itemId][size]) {
                    delete cartData[itemId][size];
                    
                    // If no sizes left for this item, remove the item entirely
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                }
            } else {
                // Ensure the item and size exist before setting quantity
                if (!cartData[itemId]) {
                    cartData[itemId] = {};
                }
                cartData[itemId][size] = quantity;
            }

            setCartItems(cartData);

            if (token) {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
                if (quantity === 0) {
                    toast.info("Item removed from cart");
                } else {
                    toast.success("Cart updated");
                }
            } else {
                // Update localStorage for non-logged in users
                localStorage.setItem('guestCart', JSON.stringify(cartData));
                if (quantity === 0) {
                    toast.info("Item removed from cart");
                } else {
                    toast.success("Cart updated");
                }
            }
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to update cart");
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        try {
            for (const items in cartItems) {
                let itemInfo = products.find((product) => product._id === items);
                if (itemInfo) {
                    for (const item in cartItems[items]) {
                        if (cartItems[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error calculating cart amount:", error);
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error(error.message || "Failed to load products")
        }
    }

    const getUserCart = async (userToken) => {
        setIsCartLoading(true);
        try {
            if (userToken) {
                const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token: userToken } })
                if (response.data.success) {
                    setCartItems(response.data.cartData || {});
                } else {
                    toast.error(response.data.message);
                    setCartItems({});
                }
            } else {
                // Load cart from localStorage for non-logged in users
                const guestCart = localStorage.getItem('guestCart');
                if (guestCart) {
                    setCartItems(JSON.parse(guestCart));
                } else {
                    setCartItems({});
                }
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to load cart");
            setCartItems({});
        } finally {
            setIsCartLoading(false);
        }
    }

    useEffect(() => {
        getProductsData();
        
        // Initialize cart from localStorage for non-logged in users
        const guestCart = localStorage.getItem('guestCart');
        if (!token && guestCart) {
            try {
                setCartItems(JSON.parse(guestCart));
            } catch (e) {
                console.error("Error parsing guest cart:", e);
                localStorage.removeItem('guestCart');
            }
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        } else {
            setIsCartLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, isCartLoading
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;