import React from "react";
import "./Styles.css";
import Block from "./Block";
import { useContext, useEffect } from "react";
import InputContextProvider from "./InputContext";

function Layout(props) {
  const InputCtx = useContext(InputContextProvider);

  //For mapping on the grid
  function coordToInd(row, col) {
    return row * props.width + col;
  }

  //Adds a block to the structure
  function addBlock(grid, row, col, width, height, img) {
    return (grid[coordToInd(row, col)] = {
      width: width,
      height: height,
      image: img,
      selected: false,
    });
  }

  useEffect(() => {
    let gridLayout = Array(props.width * props.height).fill(null);

    //OLD way of building the layout
    /**
    addBlock(gridLayout, 0, 0, 2, 2, "/images/pacman.png");
    addBlock(gridLayout, 0, 3, 2, 2, "/images/bombjack.png");
    addBlock(gridLayout, 0, 6, 2, 2, "/images/spaceinvaders.png");
    addBlock(gridLayout, 3, 0, 8, 2, "/images/digdug.png");
    addBlock(gridLayout, 6, 0, 5, 1, "/images/joust.png");
    addBlock(gridLayout, 8, 0, 5, 4, "/images/bubble.png");
    addBlock(gridLayout, 6, 6, 2, 6, "/images/mortalkombat.png");
    
    //Test layout, uncomment to test
    
    addBlock(gridLayout, 0, 0, 2, 2, "/images/pacman.png");
    addBlock(gridLayout, 3, 0, 2, 2, "/images/bombjack.png");
    addBlock(gridLayout, 6, 0, 2, 2, "/images/spaceinvaders.png");
    addBlock(gridLayout, 10, 0, 8, 2, "/images/digdug.png");
    addBlock(gridLayout, 0, 3, 5, 1, "/images/joust.png");
    addBlock(gridLayout, 2, 3, 5, 5, "/images/bubble.png");
    addBlock(gridLayout, 8, 3, 5, 1, "/images/metalslug.png");
    */

    props.blockList.forEach((block, index) => {
      addBlock(
        gridLayout,
        block.row,
        block.col,
        block.width,
        block.height,
        block.img
      );
    });

    InputCtx.setGridLayout(gridLayout, props.width, props.height);
  }, []);

  function renderBlock(ind) {
    return (
      <Block
        properties={InputCtx.getGridLayout(ind)}
        onMouseEnter={() => InputCtx.mouseEnter(ind)}
        openModal={props.openModal}
      />
    );
  }

  //Build the grid and render the blocks in position
  return (
    <div className="container">
      {Array.from({ length: props.height }, (_, i) => (
        <div className="row" key={"row" + i}>
          {Array.from({ length: props.width }, (_, j) => {
            let ind = coordToInd(i, j);
            return (
              <div className="col" key={ind}>
                {InputCtx.getGridLayout(ind) ? renderBlock(ind) : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Layout;
