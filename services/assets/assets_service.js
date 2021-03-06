//
// Author: Raja Kannan
//

'use strict';

const models = require('../db/models');

class AssetsService {
  constructor() {

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get assets by team id
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getAssetsByTeamId(teamId) {
    return await models.Asset.findAll({
      where: {
        TeamId: teamId
      },
      raw: true
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Create asset
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async createAsset(serial, model, ownerEmail, teamId) {
    await models.Asset.create({
      serial: serial,
      model: model,
      ownerEmail: ownerEmail,
      TeamId: teamId,
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Update asset
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async updateAsset(id, newSerial, newModel, newOwnerEmail) {
    const asset = await models.Asset.findByPk(id);

    asset.serial = newSerial;
    asset.model = newModel;
    asset.ownerEmail = newOwnerEmail;

    await asset.save();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete all assets
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async deleteAllAssets() {
    return await models.Asset.destroy({
      where: {},
      truncate: false
    });
  }
}

module.exports = new AssetsService();