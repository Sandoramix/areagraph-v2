import { NextApiRequest, NextApiResponse } from "next";
import { DB } from "../../../server/db";
import { AllStations } from "../../../utils/queries";
import { Station } from "../../../utils/types";

const getStations = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return res.status(405).json({ statusCode: 405, message: "Method not allowed" });
	const data = await DB.query(AllStations())
	return res.status(200).json(data.rows as Station[])
}

export default getStations;