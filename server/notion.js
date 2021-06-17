const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

// import pkgNotion from "@notionhq/client"
// import pkgDotenv from "dotenv"

// const { Client } = pkgNotion;
// const { config } = pkgDotenv;
// config()

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
