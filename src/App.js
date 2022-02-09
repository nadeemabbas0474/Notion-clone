import { Editor } from "./Components/Editor";
import "./App.css"

function App() {
  return (
    <div className="Main_App">
         <div className="contentWrapper"> 
           <div className="heading_editor placeHolderable" data-placeholder="Form Title" contentEditable={true}></div> 
          <Editor/>            
         </div>
    </div>
  );
}

export default App;
