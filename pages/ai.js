import { Configuration, OpenAIApi } from "openai";
import styles from './../components/ai.module.css';

const configuration = new Configuration({
  apiKey: "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",
});

export default function Home({ isConnected }) {
  console.log("Hey there 👋");
  console.log("Welcome to the console 😎");

  console.log(`


⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡟⠁⣰⣿⣿⣿⡿⠿⠻⠿⣿⣿⣿⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠏⠀⣴⣿⣿⣿⠉⠀⠀⠀⠀⠀⠈⢻⣿⣿⣇⠀⠀⠀
⠀⠀⠀⠀⢀⣠⣼⣿⣿⡏⠀⢠⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⡀⠀⠀
⠀⠀⠀⣰⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀
⠀⠀⢰⣿⣿⡿⣿⣿⣿⡇⠀⠘⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⢀⣸⣿⣿⣿⠁⠀⠀
⠀⠀⣿⣿⣿⠁⣿⣿⣿⡇⠀⠀⠻⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⠃⠀⠀⠀
⠀⢰⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀
⠀⢸⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠛⠉⢉⣿⣿⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣇⠀⣿⣿⣿⠀⠀⠀⠀⠀⢀⣤⣤⣤⡀⠀⠀⢸⣿⣿⣿⣷⣦⠀⠀⠀
⠀⠀⢻⣿⣿⣶⣿⣿⣿⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⡀⠀⠉⠉⠻⣿⣿⡇⠀⠀
⠀⠀⠀⠛⠿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠈⠹⣿⣿⣇⣀⠀⣠⣾⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣦⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠛⠋⠉⠉⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁


  `)

  var phrase = "";

  async function doAiStuff() {
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: phrase,
      temperature: 0.7,
      max_tokens: 125,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    document.getElementById("mainText").innerText = response.data.choices[0].text.trim();
    showPage();
  }
  
  const handleClick = (e) =>  {
    showLoader();
    phrase = document.getElementById('textInput').value;
    doAiStuff();
    document.getElementById('textInput').value = "";
  }

  const handleSecondClick = (e) =>  {
    showLoader();
    doAiStuff();
    document.getElementById('textInput').value = "";
  }

  const keyDown = (e) =>  {
    if (e.keyCode == 13) { 
      handleClick();
    }
  }

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("mainDiv").style.display = "block";
    document.getElementById("secondaryButton").style.display = "block";
  }

  function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("mainDiv").style.display = "none";
  }

  return (
    <div id="container">
      <div id="loader" className={styles.loader}></div>
      <div id="mainDiv" className={styles.mainDiv}>
        <h1 id="mainText">Wating for the Response</h1>
        <input type="text" onKeyDown={keyDown} id="textInput"></input>
        <div className={styles.buttonscontainer}>
          <button type="submit" onClick={handleClick}>Submit</button>
          <button id="secondaryButton" className={styles.secondaryButton} type="submit" onClick={handleSecondClick}>Retry</button>
        </div>
      </div>
    </div>

  )
}