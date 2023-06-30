const express = require('express');
const getUserInfo = async (accessToken) => {
        const userInfoUrl = 'https://appleid.apple.com/auth/userinfo';

        const options = {
            url: userInfoUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        try {
            const userInfoResponse = await request.get(options);
            const userInfo = JSON.parse(userInfoResponse);
            // Ở đây, bạn có thể trích xuất các thông tin như tên người dùng và avatar từ userInfo
            const { name, picture } = userInfo;
            return userInfo;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin người dùng từ Apple Identity Service');
        }
    };
const app = express();
app.get('/get/userInfo', async (req, res) => {
    try {
        const userInfo = await getUserInfo('a6165c4785f594b1f8e2ac885e7384534.0.rsyt.xD0OoGJXdndcyQ3z2ZiDkg');
        res.send(userInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Khởi chạy server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
