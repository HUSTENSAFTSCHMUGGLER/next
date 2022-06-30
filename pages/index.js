import Head from 'next/head'
import Link from 'next/link'
import clientPromise from '../lib/mongodb'
import { Configuration, OpenAIApi } from "openai";
import styles from './../components/ai.module.css';
import hljs from "highlight.js";

//Configuration for the OpenAI Api module
const configuration = new Configuration({
  //Remove and uncomment the code bellow when going Viral
  apiKey: "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",
  //apiKey: process.env.OPEN_AI_KEY,
});

export default function Home({ isConnected }) {
  //The inputtet text
  var inputText;

  //Communication with the server
  async function doAiStuff(phrase) {
    showLoader();

    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: phrase,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      best_of: 6
    });
    
    formattextanddisplay(response.data.choices[0].text.trimLeft());
    showPage();
  }

  //Format the text
  function formattextanddisplay(response) {
    document.getElementById('textInput').value = "";
    document.getElementById("mainText").textContent = response;
    
    if(response.length > 150) {
      document.getElementById("mainText").style.fontSize = "14px";
    } else if (response.length > 70) {
      document.getElementById("mainText").style.fontSize = "20px";
    } else {
      document.getElementById("mainText").style.fontSize = "2em";
    }

    if(response.toString().includes('{')) { 
      hljs.highlightAll();
    } else {
      document.getElementById("mainText").classList.remove("hljs");
    }
  }

  //Key and Button event handlers
  const handleClick = (e) =>  {
    inputText = document.getElementById('textInput').value;
    doAiStuff(inputText);
  }
  const handleRetryClick = (e) =>  {
    doAiStuff(inputText);
  }
  const handleCopyClick = (e) =>  {
    navigator.clipboard.writeText(document.getElementById("mainText").innerText);
  }
  const handleTranslateClick = (e) =>  {
    if(document.getElementById('textInput').value == "") {
      doAiStuff("Translate to german: " + document.getElementById("textInput").innerText);
    } else {
      doAiStuff("Translate to german: " + document.getElementById("mainText").innerText);
    }

  }
  const keyDown = (e) =>  {
    if (e.keyCode == 13) { 
      handleClick();
    }
  }

  //Loading Circle CSS functions
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("mainDiv").style.display = "block";
    document.getElementById("secondaryButton").style.display = "block";
    document.getElementById("copyButton").style.display = "block"; 
    document.getElementById("translateButton").style.display = "block";
  }
  function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("mainDiv").style.display = "none";
  }

  //HTML
  return (
    <div id="container">
      <Head>
        <title>LLOTAN AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="loader" className={styles.loader}></div>
      <div id="mainDiv" className={styles.mainDiv}>
        <pre>
          <code id="mainText" className={styles.mainText}>
            What do you want to know?
          </code>
        </pre>
        <input type="text" onKeyDown={keyDown} id="textInput"></input>
        <div className={styles.buttonscontainer}>
          <button type="submit" onClick={handleClick}>Submit</button>
          <button id="secondaryButton" className={styles.secondaryButton} type="submit" onClick={handleRetryClick}>Retry</button>
          <button id="copyButton" className={styles.copyButton} type="submit" onClick={handleCopyClick}>Copy</button>
          <button id="translateButton" className={styles.translateButton} type="submit" onClick={handleTranslateClick}>Translate to German</button>
          <div className={styles.translationCheckboxContainer}>
            <input type="checkbox" className={styles.translationCheckbox} id="translationCheckbox"></input>
            <p className={styles.checkboxText}>Deutsch</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    try {
        // client.db() will be the default database passed in the MONGODB_URI
        // You can change the database by calling the client.db() function and specifying a database like:
        // const db = client.db("myDatabase");
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        await clientPromise
        return {
            props: { isConnected: true },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: false },
        }
    }
}