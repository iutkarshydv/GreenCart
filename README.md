# 🌿 GreenCart - Sustainable E-Commerce Platform

![GreenCart](https://img.shields.io/badge/GreenCart-Eco--Friendly-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

GreenCart is a modern, eco-friendly e-commerce platform dedicated to sustainable living. Our mission is to make it easy for customers to discover, explore, and purchase environmentally responsible products that help reduce environmental impact while enhancing everyday life.

## ✨ Features

### 🛍️ Customer Features
- **Product Browsing**: Explore a curated collection of eco-friendly products
- **Smart Search**: Find products quickly with advanced search functionality
- **Shopping Cart**: Easy-to-use cart with real-time updates
- **User Authentication**: Secure login and registration system
- **Order Management**: Track your orders and purchase history
- **Multiple Payment Options**: 
  - Cash on Delivery (COD)
  - Stripe Integration
  - Razorpay Integration
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Comfortable viewing in any lighting condition

### 🎨 Design Features
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: Built with accessibility best practices

### 👨‍💼 Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order status
- **Image Upload**: Cloudinary integration for product images
- **Dashboard Analytics**: Monitor sales and orders

## 🚀 Tech Stack

### Frontend
- **React.js** (v18.3.1) - UI library
- **React Router DOM** (v6.26.1) - Navigation
- **Vite** (v5.4.1) - Build tool
- **Tailwind CSS** (v3.4.10) - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP requests
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Razorpay** - Payment processing
- **Multer** - File upload handling

## 📁 Project Structure

```
GreenCart/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── assets/       # Images and static assets
│   │   ├── components/   # Reusable React components
│   │   ├── context/      # Context API for state management
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main application component
│   │   └── main.jsx      # Application entry point
│   ├── public/           # Public assets
│   └── package.json      # Frontend dependencies
│
├── backend/              # Node.js backend application
│   ├── config/          # Configuration files
│   │   ├── mongodb.js   # MongoDB connection
│   │   └── cloudinary.js # Cloudinary setup
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── server.js        # Server entry point
│   └── package.json     # Backend dependencies
│
├── admin/               # Admin panel application
│   ├── src/
│   │   ├── components/  # Admin components
│   │   └── pages/       # Admin pages
│   └── package.json     # Admin dependencies
│
└── README.md           # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/iutkarshydv/GreenCart.git
cd GreenCart
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=4000
```

Start the backend server:
```bash
npm run server
```

The backend will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

The admin panel will run on a different port (check console output)

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |
| `PORT` | Server port (default: 4000) |

## 📝 API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Product Routes
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `POST /api/product/remove` - Remove product (Admin)
- `POST /api/product/single` - Get single product

### Cart Routes
- `POST /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart

### Order Routes
- `POST /api/order/place` - Place order (COD)
- `POST /api/order/stripe` - Place order (Stripe)
- `POST /api/order/razorpay` - Place order (Razorpay)
- `POST /api/order/list` - Get all orders (Admin)
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/status` - Update order status (Admin)

## 🎨 Key Components

### Frontend Components
- **Navbar** - Navigation with authentication and cart
- **Hero** - Animated landing section
- **LatestCollection** - Display latest products
- **BestSeller** - Featured products
- **NewsletterBox** - Email subscription
- **Footer** - Site footer with links
- **SearchBar** - Product search functionality
- **ProductItem** - Individual product card
- **Title** - Reusable section titles

### Pages
- **Home** - Landing page
- **Collection** - Product listing with filters
- **About** - Company information
- **Contact** - Contact form
- **Product** - Individual product details
- **Cart** - Shopping cart
- **PlaceOrder** - Checkout page
- **Orders** - Order history
- **Login** - Authentication page

## 🌐 Deployment

### Frontend (GitHub Pages / Vercel / Netlify)
```bash
cd frontend
npm run build
```

### Backend (Vercel / Heroku / Railway)
The backend includes a `vercel.json` configuration for Vercel deployment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Utkarsh**

- GitHub: [@iutkarshydv](https://github.com/iutkarshydv)
- Project Link: [https://github.com/iutkarshydv/GreenCart](https://github.com/iutkarshydv/GreenCart)

## 🙏 Acknowledgments

- Icons and images from Unsplash
- UI inspiration from modern e-commerce platforms
- Eco-friendly product data and descriptions
- Open source community

## 📞 Support

For support, email or create an issue in the GitHub repository.

---

Made with 💚 for a sustainable future
