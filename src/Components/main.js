function Main() {
    function handleChange(e) {
        console.log(e.target.value)
    }
    function checkDictionary(){
        console.log("check")
    }
  return (
    <form>
      <label htmlFor="word">Word</label>
      <input id="word" onChange={ handleChange } type="text" autoFocus></input>
      <input id="checkButton" onClick={ checkDictionary } value="check" type="button"></input>
      <label htmlFor="definition">Definition</label>
      <input id="definition" type="text"></input>
      <label htmlFor="synonyms">Synonyms</label>
      <input id="synonyms" type="text"></input>
      <input type="submit"></input>
    </form>
  );
}

export default Main;
