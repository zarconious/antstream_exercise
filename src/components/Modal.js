import "./Styles.css";
import Layout from "./Layout";

const blockList = [
  {
    row: 0,
    col: 0,
    width: 1,
    height: 1,
    img: "/images/worms.png",
  },
  {
    row: 0,
    col: 4,
    width: 1,
    height: 1,
    img: "/images/rtype.png",
  }
];

function Modal(props) {
  return (
    <div className="modal">
      <p> This is a pop-up</p>
      <Layout
        width={5}
        height={1}
        blockList={blockList}
        openModal={props.openModal}
      />
    </div>
  );
}

export default Modal;
