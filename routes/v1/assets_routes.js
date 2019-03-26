//
// Author: Raja Kannan
//

const express = require('express');
const assetsService = require('../../services/assets/assets_service');

const router = express.Router();

router.get('/teams/:teamId/assets', async (req, res, next) => {
  try {
    const teamId = req.params.teamId;

    const assets = await assetsService.getAssetsByTeamId(teamId);

    res.status(200).json(assets);
  } catch (error) {
    return next('Unable to get team assets. Reason: ' + error);
  }
});

router.post('/teams/:teamId/assets', async (req, res, next) => {
  try {
    const teamId = req.params.teamId;

    const serial = req.body.serial;
    const model = req.body.model;
    const ownerEmail = req.body.ownerEmail;

    await assetsService.createAsset(serial, model, ownerEmail, teamId);
    res.sendStatus(201);
  } catch (error) {
    return next('Unable to create team asset. Reason: ' + error);
  }
});

router.put('/assets/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const serial = req.body.serial;
    const model = req.body.model;
    const ownerEmail = req.body.ownerEmail;

    await assetsService.updateAsset(id, serial, model, ownerEmail);
    res.sendStatus(200);
  } catch (error) {
    return next('Unable to update team asset. Reason: ' + error);
  }
});

module.exports = router;
