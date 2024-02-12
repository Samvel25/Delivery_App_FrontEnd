import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import SaveLocationButton from "./components/SaveLocationButton";
import CalculateRouteButton from "./components/CalculateRouteButton";
import { saveLocation, calculateRoute } from "./services/api";

function App() {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [routePoints, setRoutePoints] = useState([]);

	const handleMapClick = (e) => {
		const coords = e.get("coords");
		setSelectedLocation({ latitude: coords[0], longitude: coords[1] });
	};

	const handleSaveLocation = async () => {
		if (selectedLocation) {
			await saveLocation(selectedLocation);
			setSelectedLocation(null);
		}
	};

	const handleCalculateRoute = async () => {
		const route = await calculateRoute();
		setRoutePoints(route.map((point) => [point.latitude, point.longitude]));
	};

	return (
		<div>
			<MapComponent onMapClick={handleMapClick} routePoints={routePoints} />
			<SaveLocationButton onSaveLocation={handleSaveLocation} />
			<CalculateRouteButton onCalculateRoute={handleCalculateRoute} />
		</div>
	);
}

export default App;
