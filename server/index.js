const express = require('express')
const app = express()
const cors =  require('cors')
const { default: axios } = require('axios')

app.listen(5000, () => console.log('Server on port 5000'))

app.use(cors({
    origin:'http://localhost:3000',
    optionsSuccessStatus: 200 
}))

const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});
app.get('/github/:user', async (req, res) => {
    const user = req.params.user
    client.get(user, async (error, reply) => {
        if (error) {
            console.log('error', error);
            res.send(error)
        } else if (reply) {
            res.json(JSON.parse(reply))
        }else {
            try {
                const { data } = await axios(`https://api.github.com/users/${user}`)
                const dataStr = JSON.stringify(data)
                console.log(data);
                client.set(user, dataStr,'EX',60 *  2); // En segundos
                res.send(data)
                
            } catch (error) {
                res.json(error.response.data)
            }

        }
    });

})