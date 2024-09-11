// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            // Create a message to send back
            // We can use Markdown inside this

            // Send our new message back in Markdown
           
            const message = `Welcome to CoinMapAi - Web3 One-Stop Navigation.\nThis bot is dedicated to the Telegram Apps platform, including bots, web apps, and games.\nSubscribe our channel:https://t.me/CoinMapAi\n
App Center: t.me/CoinMapAi_bot/CoinMapAi`
            const buttons = [
                [
                    {
                        'text': 'App Center',
                        'web_app': {
                            'url': 'https://t.me/CoinMapAi_bot/CoinMapAi' // 替换为你的Web App URL
                        }
                    }
                ]
            ]
            await bot.sendMessage(id, message);
            
            // await bot.setChatMenuButton({
            //     chat_id: id,
            //     menu_button: {
            //         type: 'web_app',
            //         text: 'AppCenter',
            //         web_app: {
            //             'url': 'https://t.me/CoinMapAi_bot/BotsCenter' // 替换为你的Web App URL
            //         }
            //     }
            // });
            
        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};
