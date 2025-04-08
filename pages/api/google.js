import connectMongo from '@/utils/db';
import User from '@/models/User';
import { setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {

    const genjwt = async (userid) => {
        const existingUser = await User.findOne({ email:reg_email });
        const user_id = existingUser._id
        const token = jwt.sign(
        { userId: user_id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
        );

        setCookie('token', token, {
        req,
        res,
        httpOnly: true,
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60, // 7 Days in seconds
        path: '/', // Available for all routes
            });
        // res.redirect(`/autologin?id=${token}`);
        res.redirect('/')
    }

    const { code } = req.query;
  
    if (!code) {
      return res.status(400).send("No code provided");
    }
  
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
  
    const tokenData = await tokenRes.json();

  
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    
  
    const user = await userRes.json();
  
    console.log(user.email)
    let reg_username = user.email.split("@")[0]
    let reg_email = user.email
    let reg_pass = "Q2m" + user.id + "!hl5"
    console.log(reg_username)
    console.log(user.id)
    console.log("pas: " + reg_pass)

    // For simplicity, store user in a cookie
    // res.setHeader("Set-Cookie", `user=${JSON.stringify(user)}; Path=/; HttpOnly`);
    await connectMongo();
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email:reg_email });
      if (existingUser) {
        genjwt()
      }else{
        // Hash the password
        const hashedPassword = await bcrypt.hash(reg_pass, 10);

        // Save the new user
        const newUser = new User({ name:reg_username, email:reg_email, password: hashedPassword });
        await newUser.save();
        genjwt()
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // res.redirect("/");
  }
  