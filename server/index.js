const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

const server = express ()
const port = 5000

server.use(cors())
server.use(express.json());

server.post('/', function (req, res) {
    res.send(req.body)
})

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

module.exports = async function createNewPage(word, definition, synonyms) {
    const response = await notion.pages.create({
        parent: {
            database_id: process.env.WORD_DATABASE_ID,
        },
        properties: {
            Word: {
                title: [
                    {
                        text: {
                            // content: word,
                            content: "test",
                        },
                    },
                ],
            },
            Definition: {
                rich_text: [{
                    text: {
                        // content: definition
                        content: "test",
                    }
                }]
            },
            Synonym: {
                rich_text: [{
                    text: {
                        // content: synonyms,
                        content: "test",
                    }
                }]
            },
        },
    });
    return(response);
};

server.listen(port, () => console.log(`Express departing now from http://localhost:${port}!`))
