import jwt from 'jsonwebtoken'
const jwt_token = process.env.jwt_token
export const getDataToken = (NextRequest) => {
    try {

        const token = NextRequest.cookies.get('token')?.value || '';
        const decodeToken = jwt.verify(token, jwt_token);
        return decodeToken
    } catch (error) {
        console.log('toke data not found', error)
    }
}
