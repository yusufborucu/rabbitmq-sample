const amqp = require("amqplib")

require('dotenv').config()

connect_rabbitmq()

async function connect_rabbitmq() {
  const connection = await amqp.connect(process.env.AMQP_URL)
  const channel = await connection.createChannel()
  await channel.assertQueue("emailQueue")

  channel.consume("emailQueue", email => {
    let mail_address = email.content.toString()
    let content = `${mail_address} ile kayıt olduğunuz için teşekkür ederiz.`
    console.log("Giden mail: ", content)

    channel.ack(email)
  })
}