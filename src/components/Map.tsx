
import { FC, useState } from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import { Station } from "../utils/types";
import * as L from 'leaflet'
import { useTheme } from "next-themes";
const markerIconDefault = L.icon({
	iconUrl: "/images/map-icon-blue.png",
	iconSize: [25, 41]
})
const markerIconSelected = L.icon({
	iconUrl: "/images/map-icon-red.png",
	iconSize: [25, 41]
})

type MapProps = {
	allStations: Station[],
	workingStations: Station[],
	token: string,
	tilesStyle: string,

}
const Map: FC<MapProps> = ({ allStations, workingStations, tilesStyle, token }) => {

	const [selectedStation, setSelectedStation] = useState<Station | null>(null);

	return (
		<>
			<MapContainer className="w-full h-full" zoom={9} minZoom={8} maxZoom={20} center={[43.775493, 11.282270]}>
				<TileLayer
					attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib" >&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib" >&copy; OSM contributors</a>'
					url={`https://{s}.tile.jawg.io/${tilesStyle}/{z}/{x}/{y}{r}.png?access-token=${token}`}
				/>

				<LayersControl position="topleft">
					<LayersControl.BaseLayer name="All stations" checked={true}>
						<LayerGroup>


							{allStations.map((station) => (
								<Marker
									eventHandlers={{
										click: (e) => {
											setSelectedStation(prev => {
												if (prev?.id === station.id) return null;
												return station;
											});

										}
									}}
									key={station.id}
									position={[station.latitude, station.longitude]}
									icon={selectedStation?.id === station.id ? markerIconSelected : markerIconDefault}
									riseOnHover={true}

								>
									<Tooltip sticky={true} >
										<h1>{station.name}</h1>
									</Tooltip>
								</Marker>
							))}

						</LayerGroup>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Most active stations">
						<LayerGroup>
							{workingStations.map((station) => (
								<Marker
									eventHandlers={{
										click: (e) => {
											setSelectedStation(prev => {
												if (prev?.id === station.id) return null;
												return station;
											});
										}
									}}
									key={station.id}
									position={[station.latitude, station.longitude]}
									icon={selectedStation?.id === station.id ? markerIconSelected : markerIconDefault}
									riseOnHover={true}

								>
									<Tooltip >
										<h1>{station.name}</h1>
									</Tooltip>
								</Marker>
							))}
						</LayerGroup>
					</LayersControl.BaseLayer>
				</LayersControl>
			</MapContainer>
		</>
	);
}
export default Map;