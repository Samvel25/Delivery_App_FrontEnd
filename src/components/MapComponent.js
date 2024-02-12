import React, { useState, useEffect } from "react";
import {
	YMaps,
	Map,
	Placemark,
	SearchControl,
	GeolocationControl,
} from "react-yandex-maps";

const MapComponent = ({ onMapClick, routePoints }) => {
	const [mapState, setMapState] = useState({
		center: [55.76, 37.64],
		zoom: 10,
	});

	// Function to handle search result selection
	const handleSearchResult = (e) => {
		const coords = e.originalEvent.target
			.getResultsArray()[0]
			.geometry.getCoordinates();
		onMapClick({ coords });
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setMapState({
					center: [position.coords.latitude, position.coords.longitude],
					zoom: 10,
				});
			});
		}
	}, []);

	return (
		<YMaps
			query={{
				apikey: process.env.REACT_APP_YANDEX_MAP_API_KEY,
				lang: "en_US",
			}}
		>
			<Map
				state={mapState}
				width="100%"
				height="400px"
				onClick={(e) => onMapClick(e.get("coords"))}
			>
				{routePoints.map((point, index) => (
					<Placemark key={index} geometry={point} />
				))}
				<SearchControl onResultSelect={handleSearchResult} />
				<GeolocationControl options={{ float: "left" }} />
			</Map>
		</YMaps>
	);
};

export default MapComponent;
