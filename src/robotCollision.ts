enum Direction {
  L = 'L',
  R = 'R',
}

type Robot = {
  position: number;
  direction: Direction;
  health: number;
  id: number;
};

export function survivedRobotsHealths(
  positions: number[],
  healths: number[],
  directions: string
): number[] {
  const robots = makeRobots(positions, healths, directions);
  const rightMovingRobotStack: Robot[] = [];

  for (const currRobot of robots) {
    if (currRobot.direction === Direction.R)
      rightMovingRobotStack.push(currRobot);
    else {
      while (rightMovingRobotStack.length && currRobot.health) {
        const righMovingRobot = rightMovingRobotStack.pop()!;
        willCollide(currRobot, righMovingRobot);
        if (righMovingRobot.health) rightMovingRobotStack.push(righMovingRobot);
      }
    }
  }

  robots.sort((a, b) => a.id - b.id);
  return robots.filter((r) => r.health > 0).map((r) => r.health);
}

function willCollide(leftRobot: Robot, rightRobot: Robot) {
  if (leftRobot.health < rightRobot.health) {
    leftRobot.health = 0;
    rightRobot.health--;
  } else if (leftRobot.health > rightRobot.health) {
    rightRobot.health = 0;
    leftRobot.health--;
  } else {
    rightRobot.health = 0;
    leftRobot.health = 0;
  }
}

function makeRobots(
  positions: number[],
  healths: number[],
  directions: string
): Robot[] {
  const robots: Robot[] = [];
  const len = positions.length;
  let i = 0;
  while (i < len) {
    const r: Robot = {
      position: positions[i],
      direction: directions[i] as Direction,
      health: healths[i],
      id: i,
    };
    i++;
    robots.push(r);
  }
  robots.sort((a, b) => a.position - b.position);
  return robots;
}
