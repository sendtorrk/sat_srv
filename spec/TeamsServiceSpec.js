'use strict';


const dbService = require('../services/db/db_service');
const teamsService = require('../services/teams/teams_service');

describe('Teams', () => {
  beforeEach(async () => {
    await teamsService.deleteAllTeams();
  });

  it('no teams should exist', async () => {
    const teams = await teamsService.getTeams();
    expect(teams.length).toEqual(0);
  });

  it('can create a new team', async () => {
    await teamsService.createTeam('Team1', 'team1@test.com');

    const teams = await teamsService.getTeams();

    expect(teams[0]).toEqual(jasmine.objectContaining({
      name: 'Team1',
      ownerEmail: 'team1@test.com'
    }));
  });

  it('cannot create duplicate team', async () => {
    try {
      await teamsService.createTeam('Team1', 'team1@test.com');
      await teamsService.createTeam('Team1', 'team1@test.com');

      fail('Duplicated team created');
    } catch (error) {
      expect().nothing();
    }
  });

  it('can retrieve all teams', async () => {
    await teamsService.createTeam('Team1', 'team1@test.com');

    const teams = await teamsService.getTeams();

    expect(teams.length).toEqual(1);
  });

  it('can retrieve a team by name and owner email', async () => {
    await teamsService.createTeam('Team1', 'team1@test.com');

    const team = await teamsService.getTeam('Team1', 'team1@test.com');

    expect(team).toEqual(jasmine.objectContaining({
      name: 'Team1',
      ownerEmail: 'team1@test.com'
    }));
  });

  it('can update a team', async () => {
    await teamsService.createTeam('Team1', 'team1@test.com');

    let team = await teamsService.getTeam('Team1', 'team1@test.com');
    const id = team.id;

    expect(team).toEqual(jasmine.objectContaining({
      name: 'Team1',
      ownerEmail: 'team1@test.com'
    }));

    await teamsService.updateTeam(id, 'Team2', 'team2@test.com');

    team = await teamsService.getTeam('Team2', 'team2@test.com');

    expect(team).toEqual(jasmine.objectContaining({
      name: 'Team2',
      ownerEmail: 'team2@test.com'
    }));
  });
});