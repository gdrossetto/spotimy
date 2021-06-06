import React from "react";
import "./loading.component.styles.scss";
import Lottie from "react-lottie";
import animationData from "./loading.json";

const Loading = ({ loading }) => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className={"backdrop"}>
      <div className={"loading"} style={{ display: loading ? "flex" : "none" }}>
        <Lottie
          options={options}
          height={"80%"}
          width={"80%"}
          isStopped={false}
          isPaused={false}
        />
      </div>
    </div>
  );
};
export default Loading;
