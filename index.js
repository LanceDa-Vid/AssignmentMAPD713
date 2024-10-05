import express from 'express';

const app = express();
app.use(express.json());

// In-memory datastore
let datastore = {
  products: []
};

// Request counters
let getCount = 0;
let postCount = 0;

// GET /products - Retrieve all products
app.get("/products", (req, res) => {
  getCount++;
  console.log(`> /products GET: received request`);
  
  res.json(datastore.products);
  
  console.log(`< /products GET: sending response`);
  console.log(`Processed Request Count--> GET: ${getCount}, POST: ${postCount}`);
});

// POST /products - Add a new product
app.post("/products", (req, res) => {
  const productData = req.body;

  // Validate incoming data
  if (!productData || !productData.productId || !productData.name || 
      !productData.price || !productData.quantity) {
    return res.status(400).json({ error: "Invalid Data" });
  }

  postCount++;
  datastore.products.push(productData);
  
  res.status(201).json(productData);
  
  console.log(`> /products POST: received request`);
  console.log(`< /products POST: sending response`);
  console.log(`Processed Request Count--> GET: ${getCount}, POST: ${postCount}`);
});

// DELETE /products - Delete all products
app.delete("/products", (req, res) => {
  datastore.products = []; // Clear all products
  console.log(`> /products DELETE: received request`);
  
  res.json({ message: "All products deleted" });
  
  console.log(`< /products DELETE: sending response`);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  const serverUrl = `http://127.0.0.1:${PORT}`;
  console.log(`Server is listening at ${serverUrl}`);
  console.log(`Endpoints:`);
  console.log(`${serverUrl}/products method: GET, POST, DELETE`);
});
