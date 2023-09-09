const express = require('express');
const {getAllReuslt, getNote ,createNote ,deleteTour , deleteAllTour} = require("./main.js");

const app = express();

app.use(express.json());

app.get('/getResult', async (req,res) => {
    const getAllResult = await getAllReuslt();
    res.send(getAllResult);
})

app.get('/getResult/:id', async (req,res) => {
    const id = req.params.id;
    const getResult = await getNote(id);
    res.send(getResult);
})

app.post('/createNote', async (req,res) => {
    try {
        const {first_name ,last_name ,email ,phone ,gender } = req.body;
        const createNotes = await createNote(first_name, last_name, email, phone, gender);
        res.status(201).send(createNotes);
        console.log(createNotes);
    } catch (error) {
        console.error(error);        
    }
})

app.delete('/deleteTour/:id', async function(req,res) {
    const id = req.params.id;
    try {
        const result = await deleteTour(id);
        res.send(`Deleted tour with ID ${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting tour');
    }
})

app.delete("/deleteAllTours", async function (req, res) {
    try {
        const deleteAllTourData = await deleteAllTour();
        console.log(deleteAllTourData);
        res.send("Tour deleted successfully");
    } catch (error) {
        console.log(error)
    }
})

app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
    next();
});

app.listen('8080', () => {
    console.log('Server running on port 8080');
})
