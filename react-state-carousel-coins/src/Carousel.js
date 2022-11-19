import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 *
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 *
 * State:
 * - currCardIdx: integer for current card index
 *
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const [leftHidden, setLeftHidden] = useState(true);
  const [rightHidden, setRightHidden] = useState(false);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //setCurrCardIdx takes time to change, and I'm not sure how to await it,
  //so the bounds calculations are done with a temp stand-in.
  let tempCardIdx;

  //Increments currCardIdx state by 1
  function goForward() {
    tempCardIdx = currCardIdx + 1;
    setCurrCardIdx(currCardIdx + 1);
    checkArrows();
  }

  //Decrements currCardIdx state by 1
  function goBackward() {
    tempCardIdx = currCardIdx - 1;
    setCurrCardIdx(currCardIdx - 1);
    checkArrows();
  }

  function checkArrows() {
    // console.log(tempCardIdx);
    // console.log(currCardIdx);
    // console.log(total);
    if (tempCardIdx === total - 1) {
      setRightHidden(true);
      //setLeftHidden(false);
    } else {
      setRightHidden(false);
    }
    if (tempCardIdx === 0) {
      setLeftHidden(true);
      //setRightHidden(false);
    } else {
      setLeftHidden(false);
    }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        <i
          className="bi bi-arrow-left-circle"
          onClick={goBackward}
          hidden={leftHidden}
        />
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        <i
          className="bi bi-arrow-right-circle"
          onClick={goForward}
          hidden={rightHidden}
        />
      </div>
    </div>
  );
}

export default Carousel;
