import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: "kunkka!",
  });
}
