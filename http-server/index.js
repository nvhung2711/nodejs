const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Nikola Tesla',
    },
    {
        id: 1,
        name: 'Sir Isaac Newton',
    },
    {
        id: 2,
        name: 'Albert Einstein',
    },
];

server.on('request', (req, res) => {
    const items = req.url.split('/');

    if (req.method === 'POST' && items[1] === 'friends') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk.toString();
        });
        req.on('end', () => {
            console.log('Request:', data);
            friends.push(JSON.parse(data));
        });
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (items[1] === 'messages') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac!</li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listenning on port ${PORT}...`);
}); //127.0.0.1 => localhost
