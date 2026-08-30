import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import PostListProvider from "../store/postListStore";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <PostListProvider>
      {" "}
      <div className="app-container">
        {" "}
        <SideBar />
        <div className="content">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
