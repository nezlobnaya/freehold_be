const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const restricted = require('../middlewares/requireLogin')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

module.exports = router => {
  router.get('/api/upload', restricted, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'udemy-blog-bucket-123',
        ContentType: 'image/jpeg',
        Key: key,
      },
      (err, url) => res.send({key, url}),
    )
  })
}
