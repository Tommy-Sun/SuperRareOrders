import { addtoDB, createDBtable, showDB } from "./components/toDatabase";
var axios = require('axios');

const url = 'https://superrare.co/sr-json/v0/nfts/orders?sort=timestamp';

interface Order {
    [key: string]: any
}

function poll() {

    axios.get(url)
        .then(function(response: Order)
        {
            const jsonData = response.data;
            createDBtable()
            
            for (const index in Array.from(Array(jsonData.length).keys())) {  //looping through every datapoint.
                addtoDB(jsonData[index]["asset"]["id"], jsonData[index])
            }
            showDB()  //shows the created/updated database in the console.
        })
        .catch(function(error: string) 
        {
            console.log(error)
        })

    setTimeout(poll, 13000)  //Call the function every 13 seconds.
}

poll()