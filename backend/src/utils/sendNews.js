const nodemailer = require('nodemailer');

const sendNews = async (options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    let message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: `<h1>Obrigado por se cadastrar no Newsletter</h1>
        <p>A Newsletter vem para você fica por dentro de 
    todas as novidades que chegam na MarketInfo antes de outros clientes.<br/>
        <img src="https://cdn.shopify.com/s/files/1/0027/2734/6241/files/mm_transparente_a2b84d84-4a01-4765-87bc-db61a6a8374c.png?v=1532464477"/></p>`
    };

    await transporter.sendMail(message);
}

module.exports = sendNews;