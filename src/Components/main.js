import { useState } from 'react';

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
  );
}

export default Main;
