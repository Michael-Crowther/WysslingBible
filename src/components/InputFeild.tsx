import React, { useState, useEffect } from 'react'
import "./styles.css";
import { Link, BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

interface Props{
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    navigate: (path: string) => void;
    initialSearchTerms: string[];
}

export const useSearchTerms = (initialSearchTerms: string[]) => {
  const [searchTerms, setSearchTerms] = useState<string[]>(initialSearchTerms);

  return [searchTerms, setSearchTerms] as const;
};

type SearchFilter = {
  [searchTerm: string]: string;
};

const searchFilter: SearchFilter = {
  "Sla / General": "/general",
  "Send to Engineers": "/sendToEngineers",
  "Codes / Wind / Snow": "/codesWindSnow",
  "Ground Mounts": "/groundMounts",
  "Error Rate Policy": "/errorRatePolicy",
  "Templates": "/templates",
  "AHJ Database": "/database",
  "Calculations": "/calculations",
  "Folders": "/folders",
  "Roof Framing": "/roofFraming",
  "Attachment & Screw Type": "/attachmentsScrews"
};

function getLink(searchTerm: string): string | undefined {
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  for (const key in searchFilter) {
    if (key.toLowerCase() === lowercaseSearchTerm) {
      return searchFilter[key];
    }
  }
  return undefined;
}

const InputFeild = ({ search, setSearch, navigate, initialSearchTerms }: Props) => {
const [searchTerms, setSearchTerms] = useSearchTerms(initialSearchTerms);


  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(search);
    const link = getLink(search);
    if(link){
      navigate(link);
      console.log(link);
    }
    else{
      console.log("no link found for search item");
    }
  };

  //This function checks to make sure joined search terms are equal to a val in searchFilter
  function shouldRenderSearchTerms(){
    const terms = searchTerms.join("");
    let matched = false;
    for(const key of Object.keys(searchFilter)){
      if(key.toLowerCase().startsWith(terms.toLowerCase()) && terms != ""){
        matched = true;
      }
    }
    return matched;
  }

  let selectedText = "";
   //This function handles when the user highlights
  //a chunk of letter from the search bar and deletes them
  //It is called when input tag in form is clicked on
  function handleTextSelection(){
    const selection = window.getSelection();
    if(selection?.toString()){
      //use has selected text
      selectedText = selection.toString();
    }
  }

  //This function sets up functionality for clicking
  //search terms in the drop down menu
  function handleSearchTermClick(key:string){
    const path = searchFilter[key];
    const emptyString = "";
    if(path){
      navigate(path);
      for(let i = 0; i < searchTerms.length; i++){
        searchTerms.pop();
      }
      setSearch("");
      setSearchTerms([]);
    }

  }

  //this changes the contents of searchTerms when a key is pressed. 
  //This is activated at the end of the input tag in the form
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const alphanumericRegex = /^[a-zA-Z0-9\s\/]$/;
    const input = event.currentTarget;
    const cursorPos = input.selectionStart ?? 0;
    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    if(event.key == "Backspace" && selectedText == "") {
      searchTerms.splice(cursorPos - 1, 1);//delete one char
    }
  
    if(event.key && selectedText != ""){
      searchTerms.splice(selectionStart, selectionEnd - selectionStart);//delete selected letters
    }
  
    if(alphanumericRegex.test(event.key)) {
      searchTerms.splice(cursorPos, 0, event.key);//insert new char
    }
      

    console.log("search terms: ", searchTerms);
  }

  //console.log("search terms size: ", searchTerms.length);

  return (
    <form className="input" onSubmit={handleSearchSubmit}>
      <input 
        className="inputBox" 
        type="input" 
        onSelect={handleTextSelection} 
        placeholder="Enter a topic to search..." 
        value={search} 
        onChange={(e)=>{
          const regex = /^[a-zA-Z0-9\s\/\b]+$/; 
          if(regex.test(e.target.value) || e.target.value == ''){
            setSearch(e.target.value)
          }
        }} 
        onKeyDown={handleKeyDown}>
      </input>

      <button className="submit" type="submit">Go</button>
      {shouldRenderSearchTerms() && (
        <div className="search-terms">
          {Object.keys(searchFilter).filter(key => key.toLowerCase().startsWith(search.toLowerCase())).map((key, index) => (
      <span key={index} className={`search-term ${searchFilter[key] ? "clickable" : ""}`} onClick={() => handleSearchTermClick(key)}>{key}</span>
    ))}
        </div>
      )}
    </form>
  )
}

export default InputFeild;
