const uuid = require('uuid')
const nodemailer = require("nodemailer")
const User = require('../models/User')

async function sendMail(data) {
    // To jest do usuniecia dla produkcyjnego serwera poczty
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let info = await transporter.sendMail(data);

    console.log("Ethereal.email preview URL: %s", nodemailer.getTestMessageUrl(info));
}

exports.registerUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        linkId: uuid.v4(),
        confirmed: false,
    })

    try {
        const addedUser = await newUser.save()

        await sendMail({
            from: 'tripapp <app@trippapp.com>', // sender address
            to: addedUser.email,
            subject: "Rejestracja w portalu TrippApp", // Subject line
            //text: "", // plain text body
            html: `Aby dokończyć rejestrację wejdź w link <a href='http://localhost:8080/api/user/confirm/${addedUser.linkId}'>tutaj</a>`, // html body
        });

        res.status(201).json(addedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.confirmUser = async (req, res) => {
    try {
        const linkId = req.params.linkId;

        const user = await User.findOne({ linkId: linkId }).exec();
        if (user != null) {
            user.confirmed = true;
            user.save();
        }
        res.redirect("/");
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}