import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navbar />} />
		</Routes>
	);
}

export default App;
