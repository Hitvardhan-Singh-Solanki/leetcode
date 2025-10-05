export interface AgentData {
  name: string;
  conversationCount: number;
  lastAssignedTimestamp: number;
  limit: number;
}

export class AssignmentSystem {
  private agentsData: Map<string, AgentData>;
  private assignedConversations: Set<number>;

  constructor(agents: string[]) {
    if (!agents || agents.length === 0) {
      throw new Error('Initial agents list cannot be empty.');
    }
    this.agentsData = new Map<string, AgentData>();
    this.assignedConversations = new Set<number>();
    const now = Date.now();
    agents.forEach((agentName) => {
      this.agentsData.set(agentName, {
        name: agentName,
        conversationCount: 0,
        lastAssignedTimestamp: now,
        limit: 2,
      });
    });
  }

  set_limit(agentName: string, limit: number): void {
    const agent = this.agentsData.get(agentName);
    if (!agent) {
      throw new Error(`Agent '${agentName}' not found.`);
    }
    if (limit < agent.conversationCount) {
      throw new Error(
        `Cannot set a limit of ${limit} for agent '${agentName}' as they currently have ${agent.conversationCount} conversations.`
      );
    }
    agent.limit = limit;
  }

  private getNextAvailableAgent(): AgentData | undefined {
    let bestAgent: AgentData | undefined = undefined;

    for (const agent of this.agentsData.values()) {
      if (agent.conversationCount >= agent.limit) {
        continue;
      }

      if (!bestAgent) {
        bestAgent = agent;
        continue;
      }

      if (agent.conversationCount < bestAgent.conversationCount) {
        bestAgent = agent;
        continue;
      } else if (agent.conversationCount === bestAgent.conversationCount) {
        if (agent.lastAssignedTimestamp < bestAgent.lastAssignedTimestamp) {
          bestAgent = agent;
          continue;
        } else if (
          agent.lastAssignedTimestamp === bestAgent.lastAssignedTimestamp
        ) {
          if (
            agent.name.localeCompare(bestAgent.name, undefined, {
              sensitivity: 'base',
            }) < 0
          ) {
            bestAgent = agent;
            continue;
          }
        }
      }
    }

    return bestAgent;
  }

  assign(conversation_ids: number[]): string[] {
    const newConversationsToAssign = conversation_ids.filter(
      (id) => !this.assignedConversations.has(id)
    );

    let totalAvailableCapacity = 0;
    for (const agent of this.agentsData.values()) {
      totalAvailableCapacity += agent.limit - agent.conversationCount;
    }

    if (newConversationsToAssign.length > totalAvailableCapacity) {
      throw new Error(
        `Not enough capacity to assign all ${newConversationsToAssign.length} new conversations. Only ${totalAvailableCapacity} slots available.`
      );
    }

    const assignedAgents: string[] = [];
    const now = Date.now();
    for (const convId of newConversationsToAssign) {
      const agent = this.getNextAvailableAgent();
      if (agent) {
        agent.conversationCount++;
        agent.lastAssignedTimestamp = now;
        this.assignedConversations.add(convId);
        assignedAgents.push(agent.name);
      } else {
        throw new Error('No available agents found for assignment.');
      }
    }

    return assignedAgents;
  }
}
