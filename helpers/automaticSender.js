const nodemailer = require('nodemailer');


async function automaticSender(user) {
    
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        host: "photo_book123@outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "photo_book123@outlook.com", // generated ethereal user
            pass: "321kooBotohP", // generated ethereal password
        },
    });
    
    const info = await transporter.sendMail({
        from: "Photo Book", // sender address
        to: `${user.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `
            Halo ${user.username}, selamat datang di situs kami, Photo Book!,
            Silakan lihat-lihat foto Anda di Bagian MyAlbum, dan Anda juga bisa mengupload foto Anda di Bagian Add New Photo
        `, // plain text body // html body
      });
}

// automaticSender('afnabdillah@gmail.com')
//     .then(() => console.log('Send message to success'))
//     .catch(err => console.log(err))

module.exports = automaticSender;
