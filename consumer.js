const amqp = require("amqplib")

require('dotenv').config()

connect_rabbitmq()

async function connect_rabbitmq() {
  const connection = await amqp.connect(process.env.AMQP_URL)
  const channel = await connection.createChannel()
  await channel.assertQueue("emailQueue")

  channel.consume("emailQueue", email => {
    console.log("Email address: ", email.content.toString())

    channel.ack(email)
  })
}