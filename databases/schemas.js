const Realm = require('realm');

export const PersonSchema = {
  name: 'Person',
  primaryKey: 'id',
  properties: {
    name: 'string',
    id: 'string',
    startDate: 'date',
    location: 'string',
    notes: 'string',
    contactsCompleted: {type: 'int', default: 0},
    nextContactDate: {type: 'date', default: new Date()},
    previousContactDate: {type: 'date', default: new Date()},
    complete: {type: 'bool', default: false},
  },
};

export const databaseOptions = {
  path: 'followUp.realm',
  schema: [PersonSchema],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true,
};
