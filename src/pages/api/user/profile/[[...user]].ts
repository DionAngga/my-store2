import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          console.log("ikan jaya 3", decoded);
          if (decoded) {
            const profile = await retrieveDataById("users", decoded.id);
            if (profile) {
              profile.id = decoded.id;
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Success",
                note: "yeay bisa dong",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: true,
                statusCode: 200,
                message: "Not Found",
                note: err,
              });
            }
          } else {
            res.status(403).json({
              status: true,
              statusCode: 200,
              message: "Access Denied",
              note: err,
            });
          }
        }
      );
    }
  }
  if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        console.log("ikan jaya", decoded);
        if (decoded) {
          await updateData("users", user[0], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "sukses coy",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "gagal cok",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "access denied",
            err,
          });
        }
      }
    );
  }
}
