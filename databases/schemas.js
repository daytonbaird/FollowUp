const Realm = require('realm');

export const PersonSchema = {
  name: 'Person',
  primaryKey: 'id',
  properties: {
    name: 'string',
    id: 'string',
    hireDate: 'date',
    storeNum: 'string',
    notes: 'string',
    callsCompleted: {type: 'int', default: 0},
    nextCallDate: {type: 'date', default: new Date()},
    complete: {type: 'bool', default: false},
  },
};

export const databaseOptions = {
  path: 'followUp.realm',
  schema: [PersonSchema],
  schemaVersion: 0,
  deleteRealmIfMigrationNeeded: true,
};
