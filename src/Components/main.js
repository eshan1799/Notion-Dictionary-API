import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function Main() {
  let [word, setWord] = useState('');
  let [definition, setDefinition] = useState('');
  let [synonyms, setSynonyms] = useState('');
  let [isCheckDisabled, setIsCheckDisabled] = useState(true);
  let [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  let [isHidden, setIsHidden] = useState(true);

  function handleWordChange(e) {
    setWord(word = e.target.value)
    if (word === "") {
      setIsCheckDisabled(isCheckDisabled = true)
    } else {
      setIsCheckDisabled(isCheckDisabled = false)
    }
    if (definition) {
      setIsSubmitDisabled(isSubmitDisabled = true)
    }
  }
  
  function handleDefinitionChange(e) {
    setDefinition(definition = e.target.value)
  }

  function handleSynonymChange(e) {
    setSynonyms(synonyms = e.target.value)
  }

  function checkDictionary(e){
    e.preventDefault()
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_GB/${ word }`)
    .then(response => response.json())
    .then(data => {
      changeState(data)
      setIsSubmitDisabled(isSubmitDisabled = false)
      setIsHidden(isHidden = false);
    })
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
        setSynonyms(synonyms = data[0].meanings[0].definitions[0].synonyms.slice(0,3).join(', '))
      } else {
        setSynonyms(synonyms = data[0].meanings[0].definitions[0].synonyms.join(', ')) 
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
    setWord(word = "")
    setDefinition(definition = "")
    setSynonyms(synonyms = "")
    alert("Successfully submitted!");
    setIsCheckDisabled(isCheckDisabled = true)
    setIsSubmitDisabled(isSubmitDisabled = true)
    setIsHidden(isHidden = true);
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
      <div id="horizontalFlex">
        <input id="wordInput" value={ word } onChange={ handleWordChange } type="text" autoFocus></input>
        <input className="buttons" value="Check" type="submit" disabled={ isCheckDisabled }></input>
      </div>
    </form>
    <form
      onSubmit={ handleSubmit }
      style={ isHidden ? { display:'none' } : { display:'block' }}
    >
      <label htmlFor="definition">Definition</label>
      <TextareaAutosize name="definition" id="definition" className="text" value={ definition } onChange={ handleDefinitionChange } />
      <label htmlFor="synonyms">Synonyms</label>
      <TextareaAutosize id="synonyms" className="text" value={ synonyms } onChange={ handleSynonymChange } />
      <input className="buttons" type="submit" disabled={ isSubmitDisabled }></input>
    </form>
    </main>
  );
}

export default Main;
