import "./Styles.css";
import Layout from "./Layout";

const blockList = [
  {
    row: 0,
    col: 0,
    width: 2,
    height: 2,
    img: "/images/pacman.png",
  },
  {
    row: 0,
    col: 3,
    width: 2,
    height: 2,
    img: "/images/bombjack.png",
  },
  {
    row: 0,
    col: 6,
    width: 2,
    height: 2,
    img: "/images/spaceinvaders.png",
  },
  {
    row: 3,
    col: 0,
    width: 8,
    height: 2,
    img: "/images/digdug.png",
  },
  {
    row: 6,
    col: 0,
    width: 5,
    height: 1,
    img: "/images/joust.png",
  },
  {
    row: 8,
    col: 0,
    width: 5,
    height: 4,
    img: "/images/bubble.png",
  },
  {
    row: 6,
    col: 6,
    width: 2,
    height: 6,
    img: "/images/mortalkombat.png",
  },
];

//Other layout for testing purposes
const otherblockList = [
    {
      row: 0,
      col: 0,
      width: 2,
      height: 2,
      img: "/images/pacman.png",
    },
    {
      row: 3,
      col: 0,
      width: 2,
      height: 2,
      img: "/images/bombjack.png",
    },
    {
      row: 6,
      col: 0,
      width: 2,
      height: 2,
      img: "/images/spaceinvaders.png",
    },
    {
      row: 10,
      col: 0,
      width: 8,
      height: 2,
      img: "/images/digdug.png",
    },
    {
      row: 0,
      col: 3,
      width: 5,
      height: 1,
      img: "/images/joust.png",
    },
    {
      row: 2,
      col: 3,
      width: 5,
      height: 5,
      img: "/images/bubble.png",
    },
    {
      row: 8,
      col: 3,
      width: 5,
      height: 1,
      img: "/images/metalslug.png",
    },
  ];

function Page(props) {
  return (
    <div>
      <Layout
        width={8}
        height={12}
        blockList={blockList}
        openModal={props.openModal}
      />
    </div>
  );
}

export default Page;
