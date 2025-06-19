import api, { graphqlRequest } from './apiService';

// Chat related API calls
export const chatService = {
  // Send a new message or start a conversation
  sendMessage: async (input) => {
    const mutation = `
      mutation SendMessage($input: ConversationInput!) {
        sendMessage(input: $input) {
          conversation {
            id
            title
            messages {
              role
              content
              timestamp
            }
            status
            tokensConsumed
            isActive
            lastMessageAt
            createdAt
          }
          tokensConsumed
          lastMessage {
            role
            content
            timestamp
          }
        }
      }
    `;
    return graphqlRequest(mutation, { input }, true);
  },

  // Continue an existing conversation
  continueConversation: async (conversationId, message, settings = {}) => {
    const input = {
      conversationId,
      message,
      settings
    };
    
    return chatService.sendMessage(input);
  },

  // Get user's conversations
  getConversations: async (options = {}) => {
    const query = `
      query MyConversations($limit: Int, $offset: Int, $activeOnly: Boolean, $includeArchived: Boolean) {
        myConversations(limit: $limit, offset: $offset, activeOnly: $activeOnly, includeArchived: $includeArchived) {
          id
          title
          messages {
            role
            content
            timestamp
          }
          status
          tokensConsumed
          isActive
          isArchived
          lastMessageAt
          createdAt
          updatedAt
        }
      }
    `;
    
    const variables = {
      limit: options.limit || 10,
      offset: options.offset || 0,
      activeOnly: options.activeOnly !== undefined ? options.activeOnly : true,
      includeArchived: options.includeArchived || false
    };
    
    return graphqlRequest(query, variables, true);
  },

  // Get conversation by ID
  getConversationById: async (id) => {
    const query = `
      query ConversationById($id: ID!) {
        conversationById(id: $id) {
          id
          title
          prompt
          messages {
            role
            content
            timestamp
          }
          settings
          status
          tokensConsumed
          isActive
          isArchived
          metadata
          lastMessageAt
          createdAt
          updatedAt
        }
      }
    `;
    
    return graphqlRequest(query, { id }, true);
  },

  // Update conversation title
  updateConversationTitle: async (id, title) => {
    const mutation = `
      mutation UpdateConversationTitle($id: ID!, $title: String!) {
        updateConversationTitle(id: $id, title: $title) {
          id
          title
          updatedAt
        }
      }
    `;
    
    return graphqlRequest(mutation, { id, title }, true);
  },

  // Archive conversation
  archiveConversation: async (id) => {
    const mutation = `
      mutation ArchiveConversation($id: ID!) {
        archiveConversation(id: $id)
      }
    `;
    
    return graphqlRequest(mutation, { id }, true);
  },

  // Delete conversation
  deleteConversation: async (id) => {
    const mutation = `
      mutation DeleteConversation($id: ID!) {
        deleteConversation(id: $id)
      }
    `;
    
    return graphqlRequest(mutation, { id }, true);
  }
};

export default chatService; 