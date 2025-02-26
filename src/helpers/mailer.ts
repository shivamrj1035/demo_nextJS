import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //  create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "72b21766276c66",
                pass: "acbcec3122f144"  
            }
        });

        const mailOptions = {
            from: 'shivam.jayswal.1003@gmail.com',
            to: email,
            subject: emailType === 'VERIFY'? 'Email Verification' : 'Password Reset',
            html: `<h4>Click <a href="${process.env.DOMAIN}/verify?token=${hashedToken}" target="_blank">here</a> or on the link below to ${emailType === 'VERIFY'? 'verify' : 'reset'} your password: \n\n${process.env.DOMAIN}/verify?token=${hashedToken}</h4>`
        };

        const mailresponse = await transport.sendMail(mailOptions)
        console.log('mail sent successfully', mailresponse);
        return mailresponse
        

    } catch (error: any) {
        console.log(error.message)
    }
}