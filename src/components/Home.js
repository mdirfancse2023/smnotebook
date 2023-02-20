import React from "react";

import Notes from "./Notes";
const Home = (props) => {
  let showAlert = props.showAlert
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
