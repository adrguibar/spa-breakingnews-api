const create = (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({message:"Please provide all required fields"});
    }

    res.status(200).send({
        user: {
            name,
            username,
            email,
            avatar,
            background
        },
        message: "User created successfully"
    });
};

module.exports = {create}