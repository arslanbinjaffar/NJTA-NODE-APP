import jwt from "jsonwebtoken";

function generateAccessToken(id: any) {
  return jwt.sign(id, process.env.TOKEN_SECRET as string, {
    expiresIn: "1800s",
  });
}

export default generateAccessToken;
