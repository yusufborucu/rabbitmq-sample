const amqp = require("amqplib")

require('dotenv').config()

connect_rabbitmq()

async function connect_rabbitmq() {
  const connection = await amqp.connect(process.env.AMQP_URL)
  const channel = await connection.createChannel()
  await channel.assertQueue("emailQueue")

  for (let i = 1; i <= 10; i++) {
    let email = `test${i}@mail.com`

    console.log("Kayıt olan mail adresi: ", email)

    channel.sendToQueue("emailQueue", Buffer.from(JSON.stringify(email)))  
  }
}