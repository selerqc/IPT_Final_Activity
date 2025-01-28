const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});  

app.get('/about', (req, res) => {
    res.send('About Page');
});  
app.get('/contacts', (req, res) => {
    res.send('Contacts Page');
}); 


const port = 1337;
app.listen(port,() =>{
    console.log(`Server running on port ${port}`)
})