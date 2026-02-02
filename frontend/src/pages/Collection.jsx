import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useLocation } from 'react-router-dom';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const location = useLocation();

  // Check if we're showing clothing categories (Men, Women, Kids)
  const isClothingCategory = () => {
    if (category.length === 0) return true; // Show by default when no category is selected
    return category.some(cat => ['Men', 'Women', 'Kids'].includes(cat));
  };

  useEffect(() => {
    // Check for URL query parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && categoryParam !== 'all') {
      setCategory([categoryParam]);
    }
  }, [location]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
        setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
      applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} checked={category.includes('Men')} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} checked={category.includes('Women')} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory}/> Kids
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Daily Use'} checked={category.includes('Daily Use')} onChange={toggleCategory}/> Daily Use Products
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Cosmetics'} checked={category.includes('Cosmetics')} onChange={toggleCategory}/> Natural Cosmetics
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bags'} checked={category.includes('Bags')} onChange={toggleCategory}/> Eco-Friendly Bags
            </p>
          </div>
        </div>
        
        {/* SubCategory Filter - Only show for clothing categories */}
        {isClothingCategory() && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
              </p>
            </div>
          </div>
        )}
        
        {/* Show subcategories for non-clothing items */}
        {category.includes('Daily Use') && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kitchen'} onChange={toggleSubCategory}/> Kitchen
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Personal Care'} onChange={toggleSubCategory}/> Personal Care
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Hydration'} onChange={toggleSubCategory}/> Hydration
              </p>
            </div>
          </div>
        )}
        
        {category.includes('Cosmetics') && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Face'} onChange={toggleSubCategory}/> Face
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Lip Care'} onChange={toggleSubCategory}/> Lip Care
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Hair Care'} onChange={toggleSubCategory}/> Hair Care
              </p>
            </div>
          </div>
        )}
        
        {category.includes('Bags') && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Totes'} onChange={toggleSubCategory}/> Totes
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Backpacks'} onChange={toggleSubCategory}/> Backpacks
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Shopping'} onChange={toggleSubCategory}/> Shopping
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ECO-FRIENDLY'} text2={'PRODUCTS'} />
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
