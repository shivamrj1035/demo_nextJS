import React from "react";
import styles from "./../assets/bubble.module.css";

const BubbleText = ({text}) => {
    return (
      <h2 className="text-center text-5xl font-thin text-indigo-300 m-2">
        {text.split("").map((child, idx) => (
          <span className={styles.hoverText} key={idx}>
            {child}
          </span>
        ))}
      </h2>
    );
  };
export default BubbleText;