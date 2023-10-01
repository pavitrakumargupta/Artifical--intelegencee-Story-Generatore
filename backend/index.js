const express=require("express")
const cors =require("cors")
const mongoose = require('mongoose');
const Story = require('./models/story-model');
const app=express()

const DB = `mongodb+srv://pilik56896:pilik56896@cluster0.x900tqm.mongodb.net/storiesDb`

mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
     console.log('DB connection suceesfull!');
   }).catch((err)=>{
    console.log("error ocurred",err.message);
   })

app.use(cors())  
app.use(express.json()) 
app.post('/api/setStories', async (req, res) => {
    console.log(req.body);
    try {
        // Extract the story data from the request body
        const { story, prompt, likes, dislikes } = req.body;

        const newStory = new Story({
            story: story,
            prompt: prompt,
            likes: likes,
            dislikes: dislikes,
        });
        console.log(newStory);
        await newStory.save();

        res.status(200).json({ message: 'Story saved successfully' });
    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500).json({ message: 'Error saving the story' });
    }
});

// Define a route to get stories
app.get('/api/getStories', async (req, res) => {
    try {
        // Use Mongoose to query the database for stories
        const stories = await Story.find({});

        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stories' });
    }
});
app.get('/', function(req, res){
    res.send('Running the On-Campus server app');
  });

const server=app.listen(process.env.PORT ||5000,()=>{
    console.log('server is listening on',process.env.PORT); 
})     