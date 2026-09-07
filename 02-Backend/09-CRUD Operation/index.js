const e = require('express');
const foodMenu = require('./data')
const {Auth} = require('./middleware/auth')
const express = require('express');
const app = express();
const PORT = 4000;


// Data parsing
app.use(express.json());

// Middleware for authentication
app.use('/admin',Auth)

// User cart items 
const userAddToCart = [];

// Home Route 
app.get('/',(req,res,) => {
    res.status(200).send('Welcome to Home Page')
})

 
// Get request for all food items 
app.get('/food',(req,res) => {
    try {
        res.status(200).send(foodMenu)
    } catch (error) {
        res.send('Some Error Occured : ', error)
    }
})


// Post request for adding the items
app.post('/admin',(req,res) => {
        try {
            foodMenu.push(req.body);
            res.status(201).send('Item Added Successfully')
        } catch (error) {
            res.send('Some Error Occured : ', error)
        }   
})


// Deletin an item from the food app 
app.delete('/admin/:id',(req,res) => {
    try {
            const id = parseInt(req.params.id);
        const index = foodMenu.findIndex(item => item.id === id)
        if (index > 0 ) {
            foodMenu.splice(index,1);
            res.status(200).send('Item Deleted')
        } else {
            res.status(400).send('Bad request')
        }
    } catch (error) {
        res.send("Some Error Occured : ", error)
    }
})


// Patch request for an update in app
app.patch('/admin',(req,res) => {
       try {
         const id = parseInt(req.body.id);
        const targetItem = foodMenu.find(item => item.id === id)
        if (targetItem) {
            if (req.body.food) {
                targetItem.food = req.body.food
            }
            if (req.body.category) {
                targetItem.category = req.body.category
            }
            if (req.body.price) {
                targetItem.price = req.body.price
            }
            res.status(200).send('Pacth applied')
        } else {
            res.status(404).send('Item Not Found')
        }
       } catch (error) {
        res.send('Some Error Occured : ', error)
       }
})


// User viewing cart Items
app.get('/user',(req,res) => {
   try {
     if (userAddToCart.length > 0 ) {
        res.status(200).send(userAddToCart);
    } else{
        res.status(401).send('Cart is Empty')
    }
   } catch (error) {
    res.send('Some Error Occured : ', error)
   }
    
})


// User adding items to the cart 
app.post('/user/:id',(req,res) => {
   try {
     const id = parseInt(req.params.id)
    const targetItem = foodMenu.find(item => item.id === id)
    if (targetItem) {
        userAddToCart.push(targetItem)
        res.status(200).send('Item added to cart ')
    } else {
        res.status(400).send('Item out of stock')
    }
   } catch (error) {
    res.send('Some Error Occured : ', error)
   }
})


// Removing an Item from User Add to Cart 
app.delete('/user/:id',(req,res) => {
   try {
     const id = parseInt(req.params.id);
    if (userAddToCart.length > 0) {
        const updatedUserAddToCart = userAddToCart.filter(item => item.id !== id)
        console.log(updatedUserAddToCart);
        res.status(200).send('Item removed from cart')
    } else{
        res.send("Cart is Empty")
    }
   } catch (error) {
    res.send('Some Error Occured : ',error)
   }
})


// Server listening
app.listen(PORT,() => {
    console.log(`App is listening at PORT : ${PORT}`);
})