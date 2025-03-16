const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Simulated database
let users = {
    'john_doe': { points: 15, answers: [] },
    'jane_smith': { points: 10, answers: [] },
};

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Endpoint for getting user points
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    if (!users[username]) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(users[username]);
});

// Endpoint for transferring points
app.post('/transfer-points', (req, res) => {
    const { sender, recipient, points } = req.body;
    
    if (!users[sender] || !users[recipient]) {
        return res.status(404).send({ message: 'User not found' });
    }

    if (users[sender].points < 10) {
        return res.status(400).send({ message: 'You need at least 10 points to transfer.' });
    }

    if (points <= 0 || points > users[sender].points) {
        return res.status(400).send({ message: 'Invalid transfer amount' });
    }

    users[sender].points -= points;
    users[recipient].points += points;

    res.status(200).send({ message: `Transferred ${points} points from ${sender} to ${recipient}.` });
});

// Endpoint for answering a question
app.post('/answer', (req, res) => {
    const { username, answerId, upvotes } = req.body;

    if (!users[username]) {
        return res.status(404).send({ message: 'User not found' });
    }

    // Add 5 points for answering
    users[username].points += 5;

    // Add 5 points if the answer gets 5 upvotes
    if (upvotes >= 5) {
        users[username].points += 5;
    }

    res.status(200).send({ message: 'Answer submitted successfully', points: users[username].points });
});

// Endpoint for removing an answer
app.delete('/answer', (req, res) => {
    const { username, answerId } = req.body;

    if (!users[username]) {
        return res.status(404).send({ message: 'User not found' });
    }

    // Deduct points when an answer is removed
    users[username].points -= 5;

    res.status(200).send({ message: 'Answer removed successfully', points: users[username].points });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
