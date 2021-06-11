import { useState } from 'react';
// import Form from './form';

const { Client } = require('@notionhq/client');

function Main() {
  let [word, setWord] = useState('');
  let [definition, setDefinition] = useState('');
  let [synonyms, setSynonyms] = useState('');

    function handleChange(e) {
        setWord(word = e.target.value)
    }

    function checkDictionary(){
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/${ word }`)
      .then(response => response.json())
      .then(data => changeState(data))
      .catch((error) => {
        console.error('Error:', error)
      })
    }

  function changeState(data) {
    setDefinition(definition = data[0].meanings[0].definitions[0].definition)
    setSynonyms(data[0].meanings[0].definitions[0].synonyms)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // fetch(clientConfiguration['filesApi.local'], {
    //   method: 'POST',
    //   headers: new Headers(),
    //   body: JSON.stringify({ communityName: communityName, body: files })
    //     }).then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err))
  }

  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
  })

  const newPage = (async () => {
    const response = await notion.pages.create({
      parent: {
        database_id: '7f205ba4dc104e8f8d47ef96c80eb572?v=342592dcdd9e48a699ddf0faebfe4f96',
      },
      properties: {
        Word: {
          title: [
            {
              text: {
                content: word,
              },
            },
          ],
        },
        Definition: {
          text: {
            content: definition,
          },
        },
        Synonym: {
          text: {
            content: synonyms,
          },
        },
      }
      // children: [
      //   {
      //     object: 'block',
      //     type: 'heading_2',
      //     heading_2: {
      //       text: [
      //         {
      //           type: 'text',
      //           text: {
      //             content: 'Lacinato kale',
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     object: 'block',
      //     type: 'paragraph',
      //     paragraph: {
      //       text: [
      //         {
      //           type: 'text',
      //           text: {
      //             content: 'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
      //             link: {
      //               url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
      //             },
      //           },
      //         },
      //       ],
      //     },
      //   },
      // ],
    });
    console.log(response);
  })();

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="word">Word</label>
      <input id="word" onChange={ handleChange } type="text" autoFocus></input>
      <input id="checkButton" onClick={ checkDictionary } value="check" type="button"></input>
      <label htmlFor="definition">Definition</label>
      <textarea id="definition" value={ definition } readOnly></textarea>
      <label htmlFor="synonyms">Synonyms</label>
      <textarea id="synonyms" value={ synonyms } readOnly></textarea>
      <input type="submit"></input>
    </form>
    // <Form props={ definition, synonyms, handleChange, handleSubmit, checkDictionary }></Form>
  );
}

export default Main;
