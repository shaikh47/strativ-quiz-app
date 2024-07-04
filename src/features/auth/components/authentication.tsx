import SignUp from "./user-registration";
import Login from "./user-login";
import { useState } from "react";
// type AuthFormProps = {};

export const Authentication = () => {
  const [view, changeView] = useState(0); 

  const handleChangeView = () => {
    if(view === 0) {
      changeView(1);
    } else if (view === 1) {
      changeView(0);
    }
  }

  if(view === 0) return <SignUp loginClick={handleChangeView}/>
  else if(view === 1) return <Login loginClick={handleChangeView}/>
}