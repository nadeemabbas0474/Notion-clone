import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AutoComplete } from './AutoComplete';
import { Button } from './button';
import drag from "./assests/Drag-5.png";
const HEADLINE = '/ headline'
const TEXT_INPUT = "/ textinput"
const OPTIONS = "/ option"

const finalSpaceCharacters = [
  {
    id: "1",
    name: "search"
  },
]
export const autoCompleteData = [
  "/ headline",
  "/ textinput",
  "/ option"
];

export const Editor = () => {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const handleSubmit = () => {
    alert("submit Successfully!!! file is in console")
    console.log(JSON.stringify(characters), "file")
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  const handleChange = (value) => {

    const addLabel = {
      name: value,
      id: Math.random().toFixed(2),

    }
    updateCharacters([...characters, addLabel])
  }

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <>
                          <li className='listItem' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                            <div style={{ display: "flex", alignItems: "center" }}>
                            <img style={{ width: "40px", opacity: "0.3" }} src={drag} />
                              {
                                name === HEADLINE ? (
                                  <h1 contentEditable={true} className="heading_editor placeHolderable" data-placeholder="Heading 1">
                                  </h1>

                                ) : ""
                              }
                              {
                                name === TEXT_INPUT ? (
                                  <div style={{ display: "flex" }}>
                                    <input style={{ margin: "16px: 0", float: "left", fontSize: "20px", outline: "none" }} placeholder='Type ' />
                                  </div>
                                ) : ""
                              }
                              {
                                name === OPTIONS ? (
                                  <div className='mainInputs'>
                                    <input placeholder='Please enter' style={{ margin: "12px  10px" }} />
                                    <input placeholder='Please enter' style={{ margin: "12px  10px" }} />
                                    <input placeholder='Please enter' style={{ margin: "12px  10px" }} />
                                  </div>
                                ) : ""
                              }

                             
                              {
                                name === "search" && (
                                  <AutoComplete style={{ marginTop: "40px", }} onChangeInput={handleChange} data={autoCompleteData} />
                                )
                              }
                            </div>
                          </li>

                        </>
                      )}


                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <Button text="Submit" onclick={handleSubmit} />
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}
