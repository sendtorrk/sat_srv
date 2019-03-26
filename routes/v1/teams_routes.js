//
// Author: Raja Kannan
//

const express = require('express');
const teamsService = require('../../services/teams/teams_service');

const router = express.Router();

router.get('/teams/:ownerEmail', async (req, res, next) => {
  try {
    const ownerEmail = req.params.ownerEmail;
    
    const teams = await teamsService.getTeamsByOwnerEmail(ownerEmail);
    res.status(200).json(teams);
  } catch (error) {
    return next('Unable to get teams by owner. Reason: ' + error);
  }
});

router.post('/teams', async (req, res, next) => {
  try {
    const name = req.body.name;
    const ownerEmail = req.body.ownerEmail;

    await teamsService.createTeam(name, ownerEmail);
    res.sendStatus(201);
  } catch (error) {
    return next('Unable to create team. Reason: ' + error);
  }
});

router.put('/teams/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const ownerEmail = req.body.ownerEmail;

    await teamsService.updateTeam(id, name, ownerEmail);
    res.sendStatus(200);
  } catch (error) {
    return next('Unable to update team. Reason: ' + error);
  }
});

module.exports = router;
