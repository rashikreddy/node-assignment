const express = require('express');
const service = require('../services/team.js');
const router = express.Router();

router.post('/', async (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let rating = parseInt(req.body.rating);
    const result = service.postDetails(id, name, rating);
    if (result.rowCount == 1) {
        res.send('---inserted---');
    }
});

router.get('/:size', async (req, res) => {
    try {
        let size = req.params.size;
        const result = await service.makeTeams(size);
        res.send(result);
    } catch (error) {
        console.log('---exception---', error);
    }
});

module.exports = router;