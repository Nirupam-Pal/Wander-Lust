Wanderlust ✈️

Wanderlust is a full-stack web application designed to help travelers find and list unique accommodations around the world. Inspired by the core functionality of platforms like Airbnb, it allows users to explore various destinations, manage their own property listings, and share experiences through reviews.

Key Features

* Property Listings: View a diverse range of accommodations including beachfront cottages, modern lofts, mountain retreats, and more.
* Filter Categories: Browse listings by categories such as Trending, Rooms, Iconic Cities, Mountains, Castles, Pools, Camping, and more.
* Detailed Views: See comprehensive details for each property, including its location, country, owner, and pricing.
* User Authentication: Secure signup and login system using Passport.js.
* CRUD Operations: Authenticated users can create, edit, and delete their own property listings.
* Review System: Share feedback by leaving ratings and comments on listings.
* Interactive UI: Includes responsive navigation, tax-inclusive price toggles, and image carousels for filters.

Technology Stack

* Frontend: EJS (Embedded JavaScript templates), Bootstrap 5, CSS3, FontAwesome.
* Backend: Node.js, Express.js.
* Database: MongoDB with Mongoose ODM.
* Authentication: Passport.js with Local Strategy.
* File Uploads: Multer and Cloudinary for hosting property images.
* Validation: Joi for schema-based data validation.

📂 Project Structure

```text
├── controllers/      # Route handler logic (listings, reviews, users)
├── init/             # Initial database seeding scripts and sample data
├── models/           # Mongoose schemas (Listing, Review, User)
├── public/           # Static assets (CSS, client-side JS)
├── routes/           # Express routers for different application modules
├── utils/            # Helper functions and custom error handling
├── views/            # EJS templates for rendering the UI
├── app.js            # Main application entry point
├── cloudConfig.js    # Cloudinary configuration for image storage
└── schema.js         # Joi validation schemas

```

Prerequisites

Before running this project locally, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (Project uses version 23.1.0)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.
* A [Cloudinary](https://cloudinary.com/) account for image hosting.

Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/nirupam-pal/wander-lust.git
cd Wander-Lust

```


2. Install dependencies:
```bash
npm install

```


3. Environment Variables:
Create a `.env` file in the root directory and add your credentials (refer to `.gitignore` for excluded files):
```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

```


4. Initialize the Database:
Seed the database with sample listing data:
```bash
node init/index.js

```


5. Start the Server:
```bash
node app.js

```


The server will start listening on **port 3000**.

---

*Developed by Wanderlust Private Limited*
