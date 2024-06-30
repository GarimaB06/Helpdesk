import "./styles/App.scss";
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Oval } from "react-loader-spinner";
import OptionsPicker from "./components/OptionsPicker";
import TicketList from "./components/TicketList";
import CustomerView from "./components/CustomerView";

export type Options = "admin" | "customer";

const App: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState<Options>("customer");
	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) {
		return (
			<div className="loader">
				<Oval
					visible={true}
					height="100"
					width="100"
					color="#3888ff"
					secondaryColor="white"
					ariaLabel="oval-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			</div>
		);
	}

	const renderOptionsPicker = () => (
		<>
			<h1 className="title">Welcome to Helpdesk!</h1>
			<p className="text">Pick your role</p>
			<OptionsPicker
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>
		</>
	);

	const renderSignIn = () => <SignIn forceRedirectUrl={"/admin-panel"} />;

	const renderUserView = () => {
		if (selectedOption === "customer") {
			return <CustomerView />;
		}
		return renderSignIn();
	};

	return (
		<Router>
			<div className="App">
				{!isSignedIn && renderOptionsPicker()}
				<Routes>
					<Route
						path="/"
						element={
							isSignedIn ? <Navigate to="/admin-panel" /> : renderUserView()
						}
					/>
					<Route
						path="/admin-panel"
						element={!isSignedIn ? <Navigate to="/" /> : <TicketList isAdmin />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
