import { useState } from 'react';
// import { useHistory } from 'react-router'

function Main() {
  let [word, setWord] = useState('');
  let [definition, setDefinition] = useState('');
  let [synonyms, setSynonyms] = useState('');

  function handleChange(e) {
      setWord(word = e.target.value)
  }

  function checkDictionary(e){
    e.preventDefault()
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/${ word }`)
    .then(response => response.json())
    .then(data => changeState(data))
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  function changeState(data) {
    if (data[0].meanings[0].definitions[0].definition) {
      setDefinition(definition = data[0].meanings[0].definitions[0].definition)
    } else {
      setDefinition(definition = "N/A")
    }
    if (data[0].meanings[0].definitions[0].synonyms) {
      if (data[0].meanings[0].definitions[0].synonyms.length > 2) {
        setSynonyms(synonyms = data[0].meanings[0].definitions[0].synonyms.slice(0,3))
      } else {
        setSynonyms(synonyms = data[0].meanings[0].definitions[0].synonyms) 
      }
    } else {
      setSynonyms(synonyms = "")
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formattedData = {
      postWord: `${ word.charAt(0).toUpperCase() + word.slice(1) }`,
      postDefinition: `${ definition }`,
      postSynonyms: `${ synonyms }`
    }
    postData('https://server-notion-api.herokuapp.com/', formattedData)
    // postData('http://localhost:5000/', formattedData)
    .then(data => {
      console.log(data)
    });
    setWord(word = "")
    setDefinition(definition = "")
    setSynonyms(synonyms = "");
  }

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  return (
    <main>
    <form onSubmit={ checkDictionary }>
      <label htmlFor="word">Word</label>
      <input id="word" value={ word } onChange={ handleChange } type="text" autoFocus></input>
      <input value="Check" type="submit"></input>
    </form>
    <form onSubmit={ handleSubmit }>
      <label htmlFor="definition">Definition</label>
      <textarea id="definition" value={ definition } readOnly></textarea>
      <label htmlFor="synonyms">Synonyms</label>
      <textarea id="synonyms" value={ synonyms } readOnly></textarea>
      <input type="submit"></input>
    </form>
    </main>
  );
}

export default Main;
