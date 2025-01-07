import bcrypt from "bcrypt";


const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}
const comparePass = async (password, savedPassword) => {
    return await bcrypt.compare(password, savedPassword);
}
export default {
    hashPassword,
    comparePass
}
