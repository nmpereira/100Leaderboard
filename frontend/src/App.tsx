import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";

const App = () => {
  const [perPage, setPerPage] = useState(50);
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <LeaderBoard perPage={perPage} />

      <Footer perPage={perPage} setPerPage={setPerPage} />
    </div>
  );
};

export default App;
