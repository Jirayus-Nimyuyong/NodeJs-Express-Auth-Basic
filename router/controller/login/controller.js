import jwt from 'jsonwebtoken'
import config from 'config'

const login = (req, res) => {
  try {
    const { username, password, type } = req.body
    const payload = {
      username: username,
      password: password, //! Should not be kept in TOKEN!!!
      type: type
    }
    const accessToken = jwt.sign(payload, config.get('jwt.secret'), { expiresIn: 360000 })
    res.status(200).json({ token: accessToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = { login }
