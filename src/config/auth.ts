export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'senhasupersecreta123' as string,
    expiresIn: '1d'
  }
}
