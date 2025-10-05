import { AssignmentSystem } from './AssignmentSystem';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe('AssignmentSystem', () => {
  let system: AssignmentSystem;
  const agents = ['Alice', 'Bob', 'Charlie'];

  beforeEach(() => {
    system = new AssignmentSystem(agents);
  });

  it('should initialize with the correct number of agents and default limits', () => {
    expect(system).toBeDefined();
    const agentsData = (system as any).agentsData;
    expect(agentsData.size).toBe(3);
    expect(agentsData.get('Alice').limit).toBe(2);
    expect(agentsData.get('Bob').limit).toBe(2);
  });

  it('should assign conversations to agents with the fewest conversations', () => {
    const conversations = [1, 2, 3];
    const assigned = system.assign(conversations);
    expect(assigned).toEqual(['Alice', 'Bob', 'Charlie']);

    const agentsData = (system as any).agentsData;
    expect(agentsData.get('Alice').conversationCount).toBe(1);
    expect(agentsData.get('Bob').conversationCount).toBe(1);
    expect(agentsData.get('Charlie').conversationCount).toBe(1);
  });

  it('should re-assign to the agent with the fewest conversations after an assignment', async () => {
    system.assign([1, 2, 3]);
    const assigned = system.assign([4]);
    expect(assigned).toEqual(['Alice']);
  });

  it('should handle tie-breaking correctly by alphabetical order', () => {
    const conversations = [1, 2, 3, 4];
    const assigned = system.assign(conversations);
    expect(assigned).toEqual(['Alice', 'Bob', 'Charlie', 'Alice']);
  });

  it('should handle tie-breaking correctly by longest waiting time', async () => {
    await system.assign([1]);
    await delay(10);
    await system.assign([2]);
    await delay(10);
    await system.assign([3]);
    await delay(10);
    const assigned = system.assign([4]);
    expect(assigned).toEqual(['Alice']);
  });

  it('should not assign a conversation that is already assigned', () => {
    system.assign([1, 2]);
    const assigned = system.assign([3, 1]);
    expect(assigned).toEqual(['Charlie']);
  });

  it('should throw an error if capacity is exceeded', () => {
    const agentsData = (system as any).agentsData;
    agentsData.get('Alice').limit = 1;
    agentsData.get('Bob').limit = 1;
    agentsData.get('Charlie').limit = 1;

    system.assign([1, 2, 3]);
    expect(() => system.assign([4])).toThrowError(/Not enough capacity/);
  });

  it('should throw an error when setting a limit below current load', () => {
    system.assign([1, 2]);
    expect(() => system.set_limit('Alice', 0)).toThrowError(
      /Cannot set a limit of 0/
    );
  });

  it('should successfully set and use a new limit', () => {
    system.set_limit('Alice', 5);
    const agentsData = (system as any).agentsData;
    expect(agentsData.get('Alice').limit).toBe(5);

    const assigned = system.assign([1, 2, 3, 4, 5, 6, 7]);
    expect(assigned).toEqual([
      'Alice',
      'Bob',
      'Charlie',
      'Alice',
      'Bob',
      'Charlie',
      'Alice',
    ]);
  });

  it('should throw an error if no agents are provided during initialization', () => {
    expect(() => new AssignmentSystem([])).toThrowError(
      'Initial agents list cannot be empty.'
    );
  });

  it('should correctly handle the example from the problem description', () => {
    system.set_limit('Bob', 4);
    system.set_limit('Charlie', 3);

    const firstAssignment = system.assign([1, 2, 3, 4]);
    expect(firstAssignment).toEqual(['Alice', 'Bob', 'Charlie', 'Alice']);

    const agentsData = (system as any).agentsData;
    expect(agentsData.get('Alice').conversationCount).toBe(2);
    expect(agentsData.get('Bob').conversationCount).toBe(1);
    expect(agentsData.get('Charlie').conversationCount).toBe(1);

    system.set_limit('Alice', 3);

    const secondAssignment = system.assign([5, 6, 7, 8, 9]);
    expect(secondAssignment).toEqual([
      'Bob',
      'Charlie',
      'Alice',
      'Bob',
      'Charlie',
    ]);

    expect(agentsData.get('Alice').conversationCount).toBe(3);
    expect(agentsData.get('Bob').conversationCount).toBe(3);
    expect(agentsData.get('Charlie').conversationCount).toBe(3);
  });
});
