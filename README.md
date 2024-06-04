# Database Migration No Downtime Example

## Introduction

In this example, we'll explore how to migrate a database schema without causing downtime in a production environment.

## Current Schema

We have a table named `users` with the following structure:

```
table users {
    user_id: bigint
    nickname: varchar(100)
}
```

## Problem Statement

We need to rename the `nickname` column to `username` without causing any downtime in the production environment.

## Migration Approach

### Simple Solution

A straightforward solution is to use a single SQL query to rename the column:

```
 ALTER TABLE users RENAME nickname to username;
```
**Pros:**
- Simple and easy to execute.

**Cons:**
- May cause table locking and downtime for large tables during the column rename operation.

### Multi-Step Solution

An alternative approach involves a multi-step migration process:

1. **Create New Column**: Add a new column named `username`.
2. **Write Triggers**: Create triggers to automatically update the `username` column whenever a record is inserted or updated, ensuring that both `nickname` and `username` stay in sync.
3. **Sync Old Records**: Batch process to synchronize existing records, ensuring that all `nickname` values are copied to the new `username` column.
4. **Update Code**: Modify your application code to write to the new `username` column instead of `nickname`.
5. **Verify and Cleanup**: Perform thorough testing to ensure data consistency and completeness. Once verified, you can safely remove the old `nickname` column.
### Code demo
**Prerequisite**
```bash
#run
yarn install
docker-compose up -d 
```
**Simulate**: Simulate production running in [`insert.js`](insert.js) file.

**Migration**: Add new column, triggers [`migrate.js`](migrate.js) file.

**Sync**: Sync Old Record [`sync.js`](sync.js) file.

**Updated code**: Updated code in [`insert_v2.js`](insert_v2.js) file.

**Cleanup**: cleanup [`cleanup.js`](cleanup.js) file.

**Pros:**
- No downtime during the migration process.
- Allows for a smoother transition without disrupting service.

**Cons:**
- More complex and requires careful planning and execution.

