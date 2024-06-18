const express = require('express');
const router = require('./routes/index.js');
const camelcaseObjectDeep = require('camelcase-object-deep');

const app = express();

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        originalJson.call(this, camelcaseObjectDeep(data));
    };
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.listen(4000, () => console.log('Server started on port 4000'));