import jwt from "jsonwebtoken";

//Generate JWT
function generateJWT(
  email: string,
  id: string,
  firstname: string,
  lastname: string,
  tenantId: string
) {
  return jwt.sign(
    { email, id, firstname, lastname, tenantId },
    process.env.JWT_SECERET
  );
}
export default generateJWT;
