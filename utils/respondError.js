module.exports = (res, error) => {
  return res.status(error.status).send({message: error.message})
}
