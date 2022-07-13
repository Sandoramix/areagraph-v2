export type Station = {
	id: number,
	name: string,
	latitude: number,
	longitude: number
}

export type FetchBetweenDates = {
	station_id: number,
	sensor_id: number,
	sensor_type: string,
	sensor_min_val: number,
	sensor_max_val: number,
	sensor_unit: string,
	data: {
		created_at: string,
		average: number,
	}[]
}

