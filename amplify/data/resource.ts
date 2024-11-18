import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== Define the Schema ===================================================
Adding a "User" table to store XP and Level information.
=========================================================================*/
const schema = a.schema({
  User: a
    .model({
      username: a.string(), // User's unique username
      level: a.integer(),       // User's level
      xp: a.integer(),          // User's XP
    })
    .authorization(allow => [allow.owner()]), // Only allow owners to access their data
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // Use user pool for authentication

    // API Key is used for public access (if needed)
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});