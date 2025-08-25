# ThriftLoop Marketplace

A Gen-Z styled marketplace for buying and selling thrift clothes.

## Project Structure

```
thriftloop/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── assets/
│   └── public/
└── backend/           # Node.js + Express backend
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    └── utils/
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file (copy from .env.example) and fill in your credentials:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file (copy from .env.example) and update the variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables
4. Deploy

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set up environment variables
4. Deploy

## Features

- User authentication (JWT)
- Product listings with images
- Chat system between buyers and sellers
- Wishlist functionality
- Responsive design
- Image upload with Cloudinary
- Category and price filters

## Tech Stack

- Frontend: React, Tailwind CSS, Vite
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Image Storage: Cloudinary
- Deployment: Vercel (frontend), Render (backend)
