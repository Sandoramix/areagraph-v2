
import { FC, useRef, useState } from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import { Station } from "../utils/types";
import * as L from 'leaflet'

import StationInfo from "./StationInfo";

const markerIconDefault = L.icon({
	iconUrl: "/images/map-icon-blue.png",
	iconSize: [25, 41]
})
const markerIconSelected = L.icon({
	iconUrl: "/images/map-icon-red.png",
	iconSize: [25, 41]
})




export type SelectedStation = {
	ref: L.Marker,
	current: Station
}
type MapProps = {
	allStations: Station[],
	workingStations: Station[],

}
const Map: FC<MapProps> = ({ allStations, workingStations }) => {

	const [selectedStation, setSelectedStation] = useState<SelectedStation | null>(null);



	const mapRef = useRef<L.Map | null>(null);

	return (
		<>
			<MapContainer className="w-full h-full sm" zoom={9} minZoom={6} maxZoom={18} center={[43.775493, 11.282270]} ref={mapRef}>
				<TileLayer
					attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib" >&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib" >&copy; OSM contributors</a>'
					url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.TILES_TOKEN}`}
				/>

				<LayersControl position="topleft">
					{
						[
							{ name: `All Stations`, list: allStations },
							{ name: `Working Stations`, list: workingStations }
						].map(({ name, list }, index) => {
							return (
								<LayersControl.BaseLayer key={index} name={name} checked={index === 0} >
									<LayerGroup>
										{list.map((station) => (
											<Marker
												eventHandlers={{
													add: (e) => {
														setSelectedStation(null);
													},
													click: (e) => {
														let { lat, lng } = e.target.getLatLng()
														var newStation: SelectedStation | null = null
														setSelectedStation(prev => {

															if (prev?.current?.id === station.id) {
																prev?.ref.setZIndexOffset(0)
															} else {
																prev?.ref.setZIndexOffset(0);
																e.target.setZIndexOffset(200);
																newStation = { ref: e.target, current: station }
															}


															let width = window.innerWidth;
															let height = window.innerHeight;

															let newLat = width < 640 ? lat - height / 5333 : lat;
															let newLng = width < 640 ? lng : lng + width / 7000;

															mapRef.current?.setView([newLat, newLng], 11)

															return newStation;
														});

													}
												}}
												key={station.id}
												position={[station.latitude, station.longitude]}
												icon={selectedStation?.current?.id === station.id ? markerIconSelected : markerIconDefault}
												riseOnHover={true}

											>
												<Tooltip sticky={true} direction="auto">
													<h1>{station.name}</h1>
												</Tooltip>
											</Marker>
										))}

									</LayerGroup>
								</LayersControl.BaseLayer>
							)
						})
					}
				</LayersControl>
			</MapContainer>

			<StationInfo station={selectedStation?.current || null} resetStation={() => setSelectedStation(null)}></StationInfo>
		</>
	);
}
export default Map;