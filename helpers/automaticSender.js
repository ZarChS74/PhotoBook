const nodemailer = require('nodemailer');

async function automaticSender(user) {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: "albummiracle098@gmail.com", // generated ethereal user
            pass: "dtyoqwhefmvtvbyw", // gmail app pasword
        },
    });
    
    const info = await transporter.sendMail({
        from: "Photo Book", // sender address
        to: `${user.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `
            Halo ${user.username}, selamat datang di situs kami, Photo Book!,
            Silakan lihat-lihat foto Anda di Bagian myPhotos!
        `, // plain text body // html body
      });
    console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// automaticSender('afnabdillah@gmail.com').catch(console.error);

module.exports = automaticSender;
