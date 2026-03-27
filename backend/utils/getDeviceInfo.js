import { UAParser } from "ua-parser-js";

export const getDeviceInfo = (req) => {
  const parser = new UAParser(req.headers["user-agent"] || "");
  const deviceInfo = parser.getResult();

  return deviceInfo;
};
