import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),

  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const roomsTable = pgTable(
  "rooms",
  {
    id: serial("id").primaryKey(),
    roomCode: varchar("room_code").unique(),
    hostId: varchar("host_id").references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    hostName: varchar("host_name").notNull(),
    joined: boolean("joined").default(false),
  }
)


