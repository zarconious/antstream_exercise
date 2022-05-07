import React from "react";
import { createContext, useEffect, useState } from "react";

const InputContext = createContext();

export function InputContextProvider(props) {
  const [grid, setGrid] = useState({
    gridLayout: [],
    moveLayout: [],
    gridWidth: 0,
    gridHeight: 0,
    cursorPos: 0,
    currentBlock: 0,
  });

  //For mapping on the grid
  function indToCoord(ind) {
    var col = Math.floor(ind / grid.gridWidth);
    return [ind - col * grid.gridWidth, col];
  }

  function getGridLayout(ind) {
    return grid.gridLayout[ind];
  }

  function setGridLayout(newGrid, width, height) {
  
    let move = Array(width * height).fill(null);
    //Map out the cursor movement grid
    newGrid.forEach((block, index) => {
      if (block) {
        var blockWidth = block.width;
        var blockHeight = block.height;
        for (let i = 0; i < blockHeight; i++) {
          for (let j = 0; j < blockWidth; j++) {
            move[index + (i * width + j)] = index;
          }
        }
      }
    });
  //Change the layout composition in state
    setGrid(() => {
      return {
        ...grid,
        gridLayout: newGrid,
        moveLayout: move,
        gridWidth: width,
        gridHeight: height,
        cursorPos: 0,
        currentBlock:0
      };
    });
  }

  function handleMouseEnter(ind) {
    selectBlock(ind,ind);
  }

  function selectBlock(ind,cPos){
    //Highlight a block and deselect the previous one
    let newGrid = grid.gridLayout;
    if (grid.currentBlock !== undefined)
      newGrid[grid.currentBlock].selected = false;
    newGrid[ind].selected = true;
    setGrid(() => {
      return {
        ...grid,
        gridLayout: newGrid,
        currentBlock: ind,
        cursorPos: cPos,
      };
    });
  }

  function moveCursor(hor, ver) {
    let pos = indToCoord(grid.cursorPos);
    let width = grid.gridWidth;
    let height = grid.gridHeight;
    const rowPos = pos[0];
    const colPos = pos[1];
    let newPos = grid.cursorPos;

    //Row cursor movement
    if (hor != 0) {
      for (let i = 0; i < width; i++) {
        let nextPos = ((rowPos + i*Math.sign(hor) + width) % width) + colPos * width;
        let currBlock = grid.moveLayout[nextPos];
        if (currBlock !== null && currBlock != grid.currentBlock) {
          newPos = nextPos;
          break;
        }
      }
    }

    // Column cursor movement
    if (ver != 0) {
      for (let i = 0; i < height; i++) {
        let nextPos = (Math.abs((colPos + i*Math.sign(ver) + height) * width) + rowPos) % (height * width);
        let currBlock = grid.moveLayout[nextPos];
        if (currBlock !== null && currBlock != grid.currentBlock) {
          newPos = nextPos;
          break;
        }
      }
    }
  
    //Select new block based on the cursor position
    const blockPos = grid.moveLayout[newPos];
    selectBlock(blockPos,newPos);
  }

  function onKeyDown(e) {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        moveCursor(0, -1);
        break;
      case "ArrowDown":
        moveCursor(0, 1);
        break;
      case "ArrowLeft":
        moveCursor(-1, 0);
        break;
      case "ArrowRight":
        moveCursor(1, 0);
        break;
      case "Enter":
        props.openModal();
        break;
      default:
    }
  }

  const context = {
    gridLayout: grid.gridLayout,
    mouseEnter: handleMouseEnter,
    getGridLayout: getGridLayout,
    setGridLayout: setGridLayout,
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <InputContext.Provider value={context}>
      {props.children}
    </InputContext.Provider>
  );
}

export default InputContext;
