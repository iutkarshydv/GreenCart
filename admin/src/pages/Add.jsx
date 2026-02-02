import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);
   const [ecoFriendly, setEcoFriendly] = useState(true);
   const [ecoAttributes, setEcoAttributes] = useState([]);
   const [materials, setMaterials] = useState([]);

   // Check if the selected category is a clothing category
   const isClothingCategory = () => {
     return ['Men', 'Women', 'Kids'].includes(category);
   };

   // Update subcategories based on selected category
   const updateSubCategory = (selectedCategory) => {
     setCategory(selectedCategory);
     
     // Reset subcategory based on the new category
     switch(selectedCategory) {
       case 'Men':
       case 'Women':
       case 'Kids':
         setSubCategory('Topwear');
         break;
       case 'Daily Use':
         setSubCategory('Kitchen');
         break;
       case 'Cosmetics':
         setSubCategory('Face');
         break;
       case 'Bags':
         setSubCategory('Totes');
         break;
       default:
         setSubCategory('Topwear');
     }
   };

   const toggleEcoAttribute = (attribute) => {
     if (ecoAttributes.includes(attribute)) {
       setEcoAttributes(prev => prev.filter(item => item !== attribute));
     } else {
       setEcoAttributes(prev => [...prev, attribute]);
     }
   };

   const toggleMaterial = (material) => {
     if (materials.includes(material)) {
       setMaterials(prev => prev.filter(item => item !== material));
     } else {
       setMaterials(prev => [...prev, material]);
     }
   };

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("ecoFriendly", ecoFriendly)
      formData.append("ecoAttributes", JSON.stringify(ecoAttributes))
      formData.append("materials", JSON.stringify(materials))
      
      // Only include sizes for clothing categories
      if (isClothingCategory()) {
        formData.append("sizes", JSON.stringify(sizes))
      } else {
        formData.append("sizes", JSON.stringify([]))
      }

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setEcoAttributes([])
        setMaterials([])
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <h1 className="text-2xl font-semibold mb-4">Add Product to GreenCart</h1>
        
        <div>
          <p className='mb-2'>Upload Image</p>

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
              <p className='mb-2'>Product category</p>
              <select onChange={(e) => updateSubCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Daily Use">Daily Use Products</option>
                  <option value="Cosmetics">Natural Cosmetics</option>
                  <option value="Bags">Eco-Friendly Bags</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Sub category</p>
              {isClothingCategory() && (
                <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
              )}
              
              {category === 'Daily Use' && (
                <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Hydration">Hydration</option>
                </select>
              )}
              
              {category === 'Cosmetics' && (
                <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                    <option value="Face">Face</option>
                    <option value="Lip Care">Lip Care</option>
                    <option value="Hair Care">Hair Care</option>
                </select>
              )}
              
              {category === 'Bags' && (
                <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                    <option value="Totes">Totes</option>
                    <option value="Backpacks">Backpacks</option>
                    <option value="Shopping">Shopping</option>
                </select>
              )}
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            </div>

        </div>

        {/* Only show sizes for clothing categories */}
        {isClothingCategory() && (
          <div>
            <p className='mb-2'>Product Sizes</p>
            <div className='flex gap-3'>
              <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
                <p className={`${sizes.includes("S") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
              </div>
              
              <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
                <p className={`${sizes.includes("M") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
                <p className={`${sizes.includes("L") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
                <p className={`${sizes.includes("XL") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
              </div>

              <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
                <p className={`${sizes.includes("XXL") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <p className='mb-2'>Eco-Friendly Attributes</p>
          <div className='flex flex-wrap gap-3'>
            <div onClick={() => toggleEcoAttribute("organic")}>
              <p className={`${ecoAttributes.includes("organic") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Organic</p>
            </div>
            
            <div onClick={() => toggleEcoAttribute("recycled")}>
              <p className={`${ecoAttributes.includes("recycled") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Recycled</p>
            </div>

            <div onClick={() => toggleEcoAttribute("biodegradable")}>
              <p className={`${ecoAttributes.includes("biodegradable") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Biodegradable</p>
            </div>

            <div onClick={() => toggleEcoAttribute("plastic-free")}>
              <p className={`${ecoAttributes.includes("plastic-free") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Plastic-Free</p>
            </div>

            <div onClick={() => toggleEcoAttribute("vegan")}>
              <p className={`${ecoAttributes.includes("vegan") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Vegan</p>
            </div>
          </div>
        </div>

        <div>
          <p className='mb-2'>Materials</p>
          <div className='flex flex-wrap gap-3'>
            <div onClick={() => toggleMaterial("organic cotton")}>
              <p className={`${materials.includes("organic cotton") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Organic Cotton</p>
            </div>
            
            <div onClick={() => toggleMaterial("bamboo")}>
              <p className={`${materials.includes("bamboo") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Bamboo</p>
            </div>

            <div onClick={() => toggleMaterial("recycled polyester")}>
              <p className={`${materials.includes("recycled polyester") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Recycled Polyester</p>
            </div>

            <div onClick={() => toggleMaterial("hemp")}>
              <p className={`${materials.includes("hemp") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Hemp</p>
            </div>

            <div onClick={() => toggleMaterial("stainless steel")}>
              <p className={`${materials.includes("stainless steel") ? "bg-green-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>Stainless Steel</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setEcoFriendly(prev => !prev)} checked={ecoFriendly} type="checkbox" id='ecoFriendly' />
          <label className='cursor-pointer' htmlFor="ecoFriendly">Eco-Friendly Product</label>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-green-600 text-white'>ADD</button>

    </form>
  )
}

export default Add