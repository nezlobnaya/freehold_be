const mockResponse = () => {
  const res = {}

  res.send = jest.fn(() => res)
  res.status = jest.fn(() => res)
  res.sendStatus = jest.fn(() => res)

  res.json = jest.fn(() => res)

  return res
}

const mockRequest = input => {
  return {
    headers: {
      authorization: 'Bearer 1234',
    },
    ...input,
  }
}

module.exports = {
  mockResponse,
  mockRequest,
}
