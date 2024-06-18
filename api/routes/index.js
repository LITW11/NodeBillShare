const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/addparticipant', async (req, res) => {
    await db.addParticipant(req.body);
    res.json({status: 'ok'});
});

router.get('/getparticipants', async (req, res) => {
    res.json(await db.getParticipants());
});

router.post('/addbill', async (req, res) => {
    await db.addBill(req.body);
    res.json({status: 'ok'});
});

router.get('/getbills', async (req, res) => {
    res.json(await db.getBills());
});

router.get('/getbill', async (req, res) => {
    res.json(await db.getBill(req.query.id));
})

module.exports = router;