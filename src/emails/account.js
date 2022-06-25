const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'simon@simoncodes.dev',
        subject: 'Welcome to Task Manager App!',
        text: `Welcome to the app, ${name}! Let me know how it works for you.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: 'simon@simoncodes.dev', 
        subject: `We're sorry to see you go`,
        text: `Hi, ${name}. We're sorry to see you leave the task manager app. Let us know if there was anything we could have done differently.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}