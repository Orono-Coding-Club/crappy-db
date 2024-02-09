const express = require("express");
const fs = require("fs")
const app = express();
const port = 3000;
let comments = []

fs.readFile("\\Users\\zman2\\Documents\\GitHub\\Club-website-API\\comments.txt", // replace with file path
    "utf-8",
    function (err,data) { 
        if (err) { 
            return console.log(err); 
        }  
        console.log("Successfully read the file."); 
        console.log(data)
        comments = JSON.parse(data)
    } )

app.get("/postcomment", async (req, res) => {
    //res.send("{\"test\":true}");
    let queries = req.query; // later switch to req.headers .
    console.log(`comment post request ${JSON.stringify(queries)}`)

    if (queries.hasOwnProperty("username") && queries.hasOwnProperty("text") && queries.hasOwnProperty("time")) {
        let result = "200 OK"
        queries = JSON.stringify(queries)
        comments.push(queries)

        fs.writeFile("\\Users\\zman2\\Documents\\GitHub\\Club-website-API\\comments.txt", // note to self: remember to replace this with the file path

            `[${comments.toString()}]`,

            async function (err) { 
                if (err) { 
                    return console.log(err); 
                }  
                console.log(comments); 
                } 
        ) // write the comments to the thing. i am so good at database design, this will most definitely not fail.


        

        res.send({
            "result": result,
            "data": comments
        })

    }
    else {
        res.send({
            "result": "400 BAD REQUEST"
        })
    }
});

app.get("/getcomments", async (req, res) => {
    console.log(`get request, sending ${comments}`)
    res.send({
        "result": "200 OK",
        "data": comments
    })
})



app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});