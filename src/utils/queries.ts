const workingStationIds = [
	34,
	49,
	51,
	53,
	68,
	69,
	79,
	80,
	87,
	89,
	107,
	22987105,
	23009801,
	23020070,
	23284701,
	23290319,
	23298562,
	23300358,
	23301399,
	23302011,
	23308564,
	24468079,
	25473218,
	27411741,
	27424053,
	31499869,
	31501097,
	31515046
]
const neededSensors = [
	'T', 'RH', 'CO2', 'PM2.5', 'PM10'
]

export const AllStations = () => "select ST.id,ST.name,ST.latitude,ST.longitude from station ST"

export function WorkingStations() {
	return `select ST.id,ST.name,ST.latitude,ST.longitude from station as ST where id in (${workingStationIds.join(",")})`
}

export function stationInfoById(id: number) {
	return `select ST.id,ST.name,ST.latitude,ST.longitude from station as ST where id = ${id}`
}


export const getSensors = () => `select S.id as sensor_id,S.sensor_type,S.min_range_val as sensor_min_val,S.max_range_val as sensor_max_val,S.unit as sensor_unit from sensor S where S.sensor_type in ('${neededSensors.join("','")}')`





export function fetch_betweenDates(st_id: number, dt_from: string, dt_to: string) {
	return `select SDHA.bucket as created_at, 
	SDHA.avg as average,
	SS.id as sensor_id,
	SS.sensor_type,
	SS.min_range_val as sensor_min_val,
	SS.max_range_val as sensor_max_val,
	SS.unit as sensor_unit,
	SDHA.station_id from station_data_hourly_avg SDHA 
	inner join sensor SS on SDHA.sensor_id = SS.id 
	where SDHA.station_id = ${st_id} and SDHA.bucket between '${dt_from}' and '${dt_to}'  
	and SS.sensor_type in ('${neededSensors.join("','")}') 
	order by SDHA.bucket, SS.name
	`
}

