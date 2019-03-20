//
// Author: Raja Kannan
//

const express = require('express');
const assetNotesService = require('../../services/assetnotes/assetnotes_service');

const router = express.Router();

router.get('/assets/:assetId/asset-notes', async (req, res, next) => {
  try {
    const assetId = req.params.assetId;

    const assetNotes = await assetNotesService.getAssetNotesByAssetId(assetId);

    res.status(200).json(assetNotes);
  } catch (error) {
    return next('Unable to get asset notes. Reason: ' + error);
  }
});

router.post('/assets/:assetId/asset-notes', async (req, res, next) => {
  try {
    const assetId = req.params.assetId;

    const note = req.body.note;
    const userEmail = req.body.userEmail;

    await assetNotesService.createAssetNote(assetId, note, userEmail);
    res.sendStatus(201);
  } catch (error) {
    return next('Unable to create asset note. Reason: ' + error);
  }
});

module.exports = router;
