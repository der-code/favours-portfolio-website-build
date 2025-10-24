"use server"

import nodemailer from "nodemailer"
import Handlebars from "handlebars"
import fs from "fs"
import path from "path"

export const sendEmail = async (name: string, email: string, subject: string, message: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    // Read and compile the Handlebars template
    const templatePath = path.join(process.cwd(), 'lib', 'email.hbs')
    const templateSource = fs.readFileSync(templatePath, 'utf8')
    const template = Handlebars.compile(templateSource)

    // Prepare template data
    const templateData = {
        name,
        email,
        subject,
        message: message.replace(/\n/g, '<br>'), // Convert line breaks to HTML
        timestamp: new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        })
    }

    // Generate HTML from template
    const html = template(templateData)

    const mailOptions = {
        from: `${name} <${email}>`,
        to: 'maxotif@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: html,
    }

    await transporter.sendMail(mailOptions)
}