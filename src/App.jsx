import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import {auth} from "./utility/firebase";
import { DataContext } from "./DataProvider/DataProvider";

function App() {
  // refresh on the initial render
  
  const [{user}, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
