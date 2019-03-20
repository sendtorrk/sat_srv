//
// Author: Raja Kannan
//

'use strict';

const teamsService = require('../services/teams/teams_service');
const assetsService = require('../services/assets/assets_service');

describe('Services', () => {
  beforeEach(async () => {
    await teamsService.deleteAllTeams();
    await assetsService.deleteAllAssets();
  });

  it('can create a new team', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');

    expect(teams[0]).toEqual(jasmine.objectContaining({
      name: 'Team1',
      ownerEmail: 'email@test.com'
    }));
  });

  it('can create a new asset', async () => {
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

  it('can retrieve teams by owner', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');
    await teamsService.createTeam('Team2', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');

    expect(teams.length).toEqual(2);
  });

  it('can retrieve assets by team', async () => {
    await teamsService.createTeam('Team1', 'email@test.com');

    const teams = await teamsService.getTeamsByOwnerEmail('email@test.com');
    const teamId = teams[0].id;

    await assetsService.createAsset('serial1', 'model1', 'email@test.com', teamId);
    await assetsService.createAsset('serial2', 'model2', 'email@test.com', teamId);

    const assets = await assetsService.getAssetsByTeamId(teamId);

    expect(assets.length).toEqual(2);
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