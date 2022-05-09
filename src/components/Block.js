import "./Styles.css";
import { useCallback } from "react";

function Block(props) {
  const width = props.properties.width * 100;
  const height = props.properties.height * 100;

  const scroll = useCallback(
    (node) => {
      //Scroll to selected element
      if (node !== null && props.properties.selected) {
        let imageTop = node.offsetTop + node.offsetParent.offsetTop;
        let imageHeight = node.getBoundingClientRect().height;
        window.scrollTo({
          top: imageTop - imageHeight * 0.5,
          behavior: "smooth",
        });
      }
    },
    [props.properties.selected]
  );

  return (
    <img
      className={props.properties.selected ? "block hover" : "block"}
      onMouseEnter={props.onMouseEnter}
      onClick={props.openModal}
      style={{
        width: width.toString() + "%",
        height: height.toString() + "%",
      }}
      src={process.env.PUBLIC_URL + props.properties.image}
      ref={scroll}
    />
  );
}

export default Block;
