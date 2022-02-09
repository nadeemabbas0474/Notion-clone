import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const ListItem = ({ text, index, moveListItem }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "item",
    item:  "id"
  }))

   console.log(collected, "connectedd")
  return collected.isDragging ? (
    <div ref={dragPreview} > hello </div>
  ) : (
    <div ref={drag} {...collected}>
      ...
    </div>
  )
}