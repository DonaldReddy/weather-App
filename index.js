import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const api_url = "http://api.weatherstack.com/current";
const api_key = "b525395aa4b00308a270ae2788f8d76c"

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
    let city = req.body.city;

    let config = {
        params: {
            access_key: api_key,
            query: city,
        },
    };

    let request = await axios.get(api_url, config);
    let response = request.data;
    if (response.error)
        res.render("index.ejs", { error: response.error });
    else
        res.render("index.ejs", { location: response.location, weather: response.current });

})

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(PORT, () => {
    console.log("listening");
})