# mernbackend
Overview

This is the backend API for the NGO project, built using Node.js, Express, and MongoDB. The API handles user authentication, donation management, event management, and other essential functionalities.

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB atlas

Authentication: JWT (JSON Web Token)

Payment Gateway: Razorpay 

Installation

Prerequisites

Ensure you have the following installed:

Node.js 
MongoDB
npm or yarn
Steps to Run

# Clone the repository
git clone https://github.com/chhayashah22/mernbackend/

# Navigate to the project directory
# Install dependencies
npm install

# Set up environment variables
Create a `.env` file in the root directory and add the following:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_SECRET_KEY=your_razorpay_secret_key

```bash
# Start the development server
npm run dev

The server will run at http://localhost:5000.

Deployment

To deploy on a cloud platform (e.g., Vercel, Render, or AWS):

Push your code to GitHub.

Set up a deployment service.

Configure environment variables.

Deploy and monitor logs.

License

This project is licensed under the MIT License.
