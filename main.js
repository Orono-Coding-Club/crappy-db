const express = require("express");
const fs = require("fs")
const app = express();
const port = 3000;

// const comments = fs.readFile("\\Users\\zman2\\Documents\\GitHub\\Club-website-API\\comments.txt",
//     function (err) { 
//         if (err) { 
//             return console.log(err); 
//         }  
//         console.log("Successfully read the file."); 
//     } )



// async function initstuff() {
//     const comments = await fetch("./comments.txt")
//     comments = comments.text() 
//     return comments
// }
// let comments = initstuff()

let comments = [

]

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
    console.log("get request")
    res.send({
        "result": "200 OK",
        "data": comments
    })
})



app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});

console.log(`Init complete. Comments loaded: ${comments.toString()}`)
