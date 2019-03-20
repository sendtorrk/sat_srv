//
// Author: Raja Kannan
//

'use strict';

const teamsService = require('../services/teams/teams_service');
const assetsService = require('../services/assets/assets_service');
const assetNotesService = require('../services/assetnotes/assetnotes_service');

describe('Services', () => {
  beforeEach(async () => {
    await teamsService.deleteAllTeams();
    await assetsService.deleteAllAssets();
    await assetNotesService.deleteAllAssetNotes();
  });

  it('can create a new team and retrieve it', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');

    expect(teams[0]).toEqual(jasmine.objectContaining({
      name: 'Team1',
      ownerEmail: 'email@test.com'
    }));
  });

  it('can create a new asset and retrieve it', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');
    const teamId = teams[0].id;

    await assetsService.createAsset('serial1', 'model1', 'email@test.com', teamId);

    const assets = await assetsService.getAssetsByTeamId(teamId);

    expect(assets[0]).toEqual(jasmine.objectContaining({
      serial: 'serial1',
      model: 'model1',
      ownerEmail: 'email@test.com'
    }));
  });

  it('can create a new asset note and retreive it', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');
    const teamId = teams[0].id;

    await assetsService.createAsset('serial1', 'model1', 'email@test.com', teamId);

    const assets = await assetsService.getAssetsByTeamId(teamId);
    const assetId = assets[0].id;

    await assetNotesService.createAssetNote(assetId, 'Test note1', 'email@test.com');

    const assetNotes = await assetNotesService.getAssetNotesByAssetId(assetId);

    expect(assetNotes[0]).toEqual(jasmine.objectContaining({
      note: 'Test note1',
      userEmail: 'email@test.com'
    }));
  });

  it('cannot create duplicate team', async () => {
    try {
      await teamsService.createTeam('Team1', 'email@test.com');
      await teamsService.createTeam('Team1', 'email@test.com');

      fail('Duplicated team created');
    } catch (error) {
      // passed
    }
  });

  it('cannot create duplicate asset', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');
    const teamId = teams[0].id;

    try {
      await assetsService.createAsset('serial1', 'model1', 'email@test.com', teamId);
      await assetsService.createAsset('serial1', 'model1', 'email@test.com', teamId);

      fail('Duplicate asset created');
    } catch (error) {
      // passed
    }
  });

  it('can update a team', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    let teams = await teamsService.getTeamsByOwnerEmail('email@test.com');
    const id = teams[0].id;

    await teamsService.updateTeam(id, 'Team2', 'email@test.com');

    teams = await teamsService.getTeamsByOwnerEmail('email@test.com');

    expect(teams[0]).toEqual(jasmine.objectContaining({
      name: 'Team2',
      ownerEmail: 'email@test.com'
    }));
  });
});