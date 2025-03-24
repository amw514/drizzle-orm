import { relations } from "drizzle-orm";
import {
    boolean,
    index,
    integer,
    pgTable,
    primaryKey,
    real,
    serial,
    text,
    timestamp,
    varchar,
  } from "drizzle-orm/pg-core";
  
  
  export const usersTable = pgTable(
    "users",
    {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 255 }).notNull().unique(),
      age: integer("age").notNull(),
    },
    (table) => [index("email_idx").on(table.email)]
  );
  
  export const UserReferencesTable = pgTable("user_references", {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => usersTable.id).notNull(),
    emailUpdates: boolean("email_updates").notNull().default(false),
  });
  
  export const PostTable = pgTable("posts", {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    averageRating: real("average_rating").notNull().default(0),
    authorId: integer("author_id").references(() => usersTable.id).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  });
  
  export const CategoryTable = pgTable("categories", {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  });
  
  export const PostCategoryTable = pgTable("post_categories", {
    postId: integer("post_id").references(() => PostTable.id).notNull(),
    categoryId: integer("category_id").references(() => CategoryTable.id).notNull(),
  }, (table) => [
    primaryKey({ name: "post_category_pk", columns: [table.postId, table.categoryId] })
  ]);
  
  



  // Relations



export const userRelations = relations(usersTable, ({ one,many }) => ({
  userReferences: one(UserReferencesTable, {
    fields: [usersTable.id],
    references: [UserReferencesTable.userId],
  }),
  posts: many(PostTable),
}));

export const postRelations = relations(PostTable, ({ one,many }) => ({
  author: one(usersTable, {
    fields: [PostTable.authorId],
    references: [usersTable.id],
  }),
  categories: many(CategoryTable),
}));






// user register


export const userRegisterTable = pgTable("user_register", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  confirmPassword: varchar("confirm_password", { length: 255 }).notNull(),

});


