import Head from 'next/head'
import Link from 'next/link'
import clientPromise from '../lib/mongodb'
import { Configuration, OpenAIApi } from "openai";
import styles from './../components/ai.module.css';
import { languages } from './../components/languages.js';
import $ from 'jquery'
import hljs from "highlight.js";
import { useEffect } from 'react';
import { Select } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Darkmode from 'darkmode-js';
//var paperspace_node = require("paperspace-node");
import Swal from 'sweetalert2'

/* var paperspace = paperspace_node({
  apiKey: process.env.PAPERSPACE // <- paste your api key here
}); */

//Configuration for the OpenAI Api module
const configuration = new Configuration({
  //Remove and uncomment the code bellow when going Viral
  apiKey: process.env.OPEN_AI_KEY
});

export default function Home({ isConnected }) {
  //The inputtet text
  let inputText;
  let language; 
  const options = {
    time: '0.5s', // default: '0.3s'
    mixColor: 'white', // default: '#fff'
    backgroundColor: '#242424',  // default: '#fff'
    buttonColorDark: '#FF4B2B',  // default: '#100f2c'
    buttonColorLight: '#100f2c', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }
   
  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  //Communication with the server
  async function doAiStuff(phrase) {
    showLoader();

    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: phrase,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      best_of: 1
    });
    
    formattextanddisplay(response.data.choices[0].text.trimLeft());
    showPage();
  }
  
   async function createImage() {
    showLoader();
    const openai = new OpenAIApi(configuration);
    let textPrompt = $("#textInput")[0].value;
    const response = await openai.createImage({
        prompt: textPrompt,
        n: 1,
        size: "1024x1024",
    });
    
    $("#mainText")[0].textContent = response.data.data[0].url;
    showPage();
  }

  //Format the text
  function formattextanddisplay(response) {
    document.getElementById('textInput').value = "";
    $("#mainText")[0].textContent = response;
    
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

  //Event handlers
  const handleClick = (e) =>  {
    inputText = document.getElementById('textInput').value;
    doAiStuff(inputText);
  }

  useEffect(() => {
/*     paperspace.machines.start(
      {
        machineId: "ps0m28rq9",
      },
      function (err, res) {
        Swal.fire({
          icon: 'error',
          title: err.message
        })
      }
    ); */

    $(".darkmode-layer").css("mix-blend-mode", "unset");
    $(".darkmode-layer--button").css("right", "33px");
    $(".darkmode-layer--button").css("bottom", "33px");
    $(".darkmode-toggle").css("padding-bottom", "4px");
    $(".darkmode-toggle").css("fontSize", "20px");
    
    $(".darkmode-toggle").on("click", (e) => {
      if($("body").hasClass("darkmode--activated")) {
        $(".container").removeClass("darkmode-class");
      } else {
        $(".container").addClass("darkmode-class");
      }      
    })

    $(".mbsc-textfield-inner-box").on("click", (e) => {
      $(".mbsc-scroller-wheel-item").on("click", (e) => {
        language = e.currentTarget.innerText;
        if(language.search("TRIAL") != -1) language = language.replace("TRIAL\n", "");
        $("#translateButton")[0].textContent = `Translate to ${language}`;
      })
      $(".mbsc-popup-button-primary").on("click", (e) => {
        language = $(".mbsc-selected")[1].parentElement.outerText;
        if(language.search("TRIAL") != -1) language = language.replace("TRIAL\n", "");
        $("#translateButton")[0].textContent = `Translate to ${language}`;
      });
    });

    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      $(".container").addClass("darkmode-class");
    }
  })

  const handleRetryClick = (e) =>  {
    doAiStuff(inputText);
  }
  const handleCopyClick = (e) =>  {
    navigator.clipboard.writeText(document.getElementById("mainText").innerText);
  }
  const handleCreateImageClick = (e) =>  {
    createImage();
  }
  const handleTranslateClick = (e) =>  {
    if ($(".mbsc-textfield")[0].attributes[1].textContent == "") {
      doAiStuff("Repeat the folowing sentence: Please select a country first before trying to translate");
    } else {
      if($("#textInput")[0].value == "") {
/*         console.log("No Text Input");
        console.log($("#mainText")[0].lastChild.textContent);
        console.log($("#textInput")[0].value == "");
        console.log($(".mbsc-textfield")[0].attributes[1].textContent); */
        doAiStuff(`Translate following into the ${$(".mbsc-textfield")[0].attributes[1].textContent} language: ${$("#mainText")[0].lastChild.textContent}`);
      } else {
/*         console.log("Text Input");
        console.log($("#mainText")[0].lastChild.textContent);
        console.log($("#textInput")[0].value == "");
        console.log($(".mbsc-textfield")[0].attributes[1].textContent); */
        doAiStuff(`Translate following into the ${$(".mbsc-textfield")[0].attributes[1].textContent} language: ${$("#textInput")[0].value}`);
      }
    }
  }
  const keyDown = (e) =>  {
    if (e.keyCode == 13) { 
      handleClick();
    }
  }

  //Loading Circle CSS functions
  function showPage() {
    $("#loaderContainer").css("display", "none");
    $("#loader").css("display", "none");
    $("#mainDiv").css("display", "block");
    $("#copyButton").css("display", "block");
    $("#translateButton").css("display", "block");
  }
  function showLoader() {
    $("#loaderContainer").css("display", "flex");
    $("#loader").css("display", "block");
    $("#mainDiv").css("display", "none");
  }

  //HTML
  return (
    <div id="container">
      <Head>
        <title>LLOTAN AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="loaderContainer">
        <div id="loader" className={styles.loader}></div>
      </div>
      <div id="mainDiv" className={styles.mainDiv}>
        <div id="textDiv">
          <pre>
            <code id="mainText" className={styles.mainText}>
              What do you want to know? Ask the AI!
            </code>
          </pre>
        </div>
        <div id="inputbox">
          <input type="text" onKeyDown={keyDown} id="textInput"></input>
        </div>
        <div id="button-container" className={styles.buttonscontainer}>
          <button className={styles.buttonStyle} type="submit" onClick={handleClick}>Submit</button>
          <button id="secondaryButton" className={`${styles.secondaryButton} ${styles.buttonStyle}`} type="submit" onClick={handleRetryClick}>Retry</button>
          <button id="copyButton" className={`${styles.copyButton} ${styles.buttonStyle}`} type="submit" onClick={handleCopyClick}>Copy</button>
          <button id="translateButton" className={`${styles.translateButton} ${styles.buttonStyle}`} type="submit" onClick={handleTranslateClick}>Translate</button>
          <button id="createImageButton" className={`${styles.translateButton} ${styles.buttonStyle}`} type="submit" onClick={handleCreateImageClick}>Translate</button>
          <div id="languagesSelector">
            <Select id="languages" data={languages} label="Countries" filter={true} theme="material" themeVariant="light"
              responsive={{
                xsmall: {
                    display: 'bottom',
                    touchUi: true
                },
                small: {
                    display: 'anchored',
                    touchUi: true
                },
                custom: { // Custom breakpoint
                    breakpoint: 800,
                    display: 'anchored',
                    touchUi: false
                }
              }}
            />
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
