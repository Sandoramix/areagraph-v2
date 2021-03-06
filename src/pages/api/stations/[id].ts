import { NextApiRequest, NextApiResponse } from "next";

var isDate = function (date?: string) {
	if (!date) return false;
	return new Date(date) != null;
}
import { DB } from "../../../server/db";
import { fetch_betweenDates, getSensors, stationInfoById } from "../../../utils/queries";
import { FetchBetweenDates, Station } from "../../../utils/types";

const maxDays = 60;



const getStations = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).json({ statusCode: 405, message: "Method not allowed" });
	var { id, start, end } = req.query;


	if (!id) return res.status(400).json({ statusCode: 400, message: "Missing station id" });
	if (Array.isArray(id)) id = id[0];
	if (!id || !parseInt(id)) return res.status(400).json({ statusCode: 400, message: "Invalid station id" });

	const stationID = parseInt(id)

	const stationCheck = await DB.query(stationInfoById(stationID));
	if (!stationCheck.rowCount) return res.status(404).json({ statusCode: 404, message: "Station not found" });

	if (!start) return res.status(400).json({ statusCode: 400, message: "Missing start date" });
	if (!end) return res.status(400).json({ statusCode: 400, message: "Missing end date" });

	if (Array.isArray(start)) start = start[0];
	if (Array.isArray(end)) end = end[0];


	if (!isDate(start) || !start) return res.status(400).json({ statusCode: 400, message: "Invalid start date" });
	if (!isDate(end) || !end) return res.status(400).json({ statusCode: 400, message: "Invalid end date" });

	const startDate = new Date(start);
	const endDate = new Date(end);

	if (endDate.getTime() - startDate.getTime() > maxDays * 24 * 60 * 60 * 1000) return res.status(400).json({ statusCode: 400, message: "Too many days" });


	if (startDate.getTime() > endDate.getTime()) return res.status(400).json({ statusCode: 400, message: "Start date must be before end date" });
	if (endDate.getTime() - startDate.getTime() > maxDays * 24 * 60 * 60 * 1000) return res.status(400).json({ statusCode: 400, message: "Maximum time span is " + maxDays + " days" });


	const data = await DB.query(fetch_betweenDates(stationID, start, end));
	var list: {
		created_at: string,
		average: number,
		sensor_id: number,
		sensor_type: string,
		sensor_min_val: number,
		sensor_max_val: number,
		sensor_unit: string,
		station_id: number,
	}[] = data.rows

	var result: FetchBetweenDates[] = []

	list.forEach((item) => {
		var index = result.findIndex(x => x.sensor_id === item.sensor_id)
		if (index == -1) {
			result.push({
				station_id: item.station_id,
				sensor_id: item.sensor_id,
				sensor_type: item.sensor_type,
				sensor_min_val: item.sensor_min_val,
				sensor_max_val: item.sensor_max_val,
				sensor_unit: item.sensor_unit,
				data: []
			})
			index = result.length - 1
		}
		result[index]!.data.push({ average: item.average, created_at: item.created_at })
	})

	return res.status(200).json(result)
}


export default getStations;