const Discord = require("discord.js");
const keepAlive = require(`./server`);
const client = new Discord.Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent"
  ],
});

client.login(process.env.bot_token)

client.on('ready', () => {
  console.log("Logged in as: " + client.user.username);
});

client.on('messageCreate', msg => {
  if (msg.author.bot) {
    return
  }

  if (msg.content.startsWith('/help')) {
    msg.reply('To complete a calculation please use the calc command:\n /calc resin {PrintHours} {MaterialCost} {PostPrintHours} {SlicingTime}')
  }

  if (msg.content.startsWith('/dm')) {
    let messageContent = msg.content.replace('!dm', '')
    msg.member.send(messageContent)
  }

  if (msg.content.startsWith('/calc')) {
    const args = msg.content.split(' ')
    // console.log(args)
    let cost = ''
    if (args[1].includes('resin')) {
      let hours = args[2].valueOf()
      let chitPrice = args[3].valueOf()
      let processingHours = args[4].valueOf()
      let modellingHours = args[5].valueOf()

      console.log(hours)
      console.log(chitPrice)
      //$0.75 per hour to print
      let hoursPrice = parseFloat(hours) * 0.75
      console.log(hoursPrice)
      //price to print and what chitubox(or other software) says  the material cost
      let manufacturingPrice = parseFloat(chitPrice) + parseFloat(hoursPrice)
      console.log(manufacturingPrice)

      //$1.00 per hour to do post processing like desupporting, alcohol bathes and spray a base coat
      let postPrint = parseFloat(processingHours) * 1.00
      //total cost for post processign and manufacturing
      let manufacturingPostPrice = parseFloat(manufacturingPrice) + parseFloat(postPrint)
      console.log(manufacturingPostPrice)

      //price to run the machine on electric
      let electricPrice = parseFloat(hours) * 0.01
      //slicing and modelling costs 
      let modelingPrice = parseFloat(modellingHours / 60) * 0.20
      //total cost

      cost = parseFloat(manufacturingPostPrice) + parseFloat(electricPrice) + parseFloat(modelingPrice)
      console.log(cost)

    }
    if (args[1].includes('pla')) {
      let hours = args[2].valueOf()
      let chitPrice = args[3].valueOf()
      let processingHours = args[4].valueOf()
      let modellingHours = args[5].valueOf()

      console.log(hours)
      console.log(chitPrice)
      //$0.75 per hour to print
      let hoursPrice = parseFloat(hours) * 0.75
      console.log(hoursPrice)
      //price to print and what chitubox(or other software) says  the material cost
      let manufacturingPrice = parseFloat(chitPrice) + parseFloat(hoursPrice)
      console.log(manufacturingPrice)

      //$1.00 per hour to do post processing like desupporting, alcohol bathes and spray a base coat
      let postPrint = parseFloat(processingHours) * 1.00
      //total cost for post processign and manufacturing
      let manufacturingPostPrice = parseFloat(manufacturingPrice) + parseFloat(postPrint)
      console.log(manufacturingPostPrice)

      //price to run the machine on electric
      let electricPrice = parseFloat(hours) * 0.01
      //slicing and modelling costs 
      let modelingPrice = parseFloat(modellingHours / 60) * 0.20
      //total cost

      cost = parseFloat(manufacturingPostPrice) + parseFloat(electricPrice) + parseFloat(modelingPrice)
      console.log((Math.round((cost + Number.EPSILON) * 100) / 100).toString())

    }
    msg.reply((Math.round((cost + Number.EPSILON) * 100) / 100).toString())
  }

})
keepAlive();