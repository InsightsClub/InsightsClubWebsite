import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import EventsPage from "./pages/EventsPage/eventsPage";
import Landing from "./components/Landing/Landing";
import About from "./components/AboutPage/About";
import VideoPage from "./components/VideoPage/Video";
import BlogsLanding from "./pages/BlogsLanding/BlogsLanding";
import ArticleLanding from "./pages/ArticleLanding/ArticleLanding";
import DetailedArticle from "./components/Articles/DetailedArticles/DetailedArticle";
import EventDetails from "./components/DetailEvent/eventDetails";
import Create from "./components/Blogs/CreateBlog/Create";
import View from "./components/Blogs/CreateBlog/View";
import Profile from "./pages/Profile/Profile";
import NewEvent from "./components/NewEvent/newEvent";
import ProtectedRoute from "./utils/ProtectedRoute";
import NewVideo from "./components/VideoPage/NewVideo";
import EditEvent from "./components/EditEvent/editEvent";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navbar />}>
				<Route exact path='' element={<Landing />} />
				<Route path='events' element={<EventsPage />} />
				<Route path='event/:id' element={<EventDetails />} />
				<Route path='event/edit/:id' element={<EditEvent />} />
				<Route path='about' element={<About />} />
				<Route element={<ProtectedRoute coAdminLevelAccess={true} />}>
					<Route path='videos/new' element={<NewVideo />} />
				</Route>
				<Route path='videos' element={<VideoPage />} />
				<Route path='articles' element={<ArticleLanding />} />
				<Route path='article/:id' element={<DetailedArticle />} />
				<Route element={<ProtectedRoute coAdminLevelAccess={true} />}>
					<Route path='events/newEvent' element={<NewEvent />} />
				</Route>
				<Route path='profile' element={<Profile />} />
			</Route>

			<Route path='blogs' element={<BlogsLanding />} />
			{/* <Route path='write' element={<Create />} /> */}
			<Route path='write/:id' element={<Create />} />
			<Route path='blog/:id' element={<View />} />
		</Routes>
	);
}

export default App;
