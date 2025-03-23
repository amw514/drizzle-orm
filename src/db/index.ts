import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { CategoryTable, PostCategoryTable, PostTable, UserReferencesTable, usersTable } from "./schema";

// Create a SQL connection
const sql = neon(process.env.DATABASE_URL!);
// Initialize drizzle with the connection
const db = drizzle(sql, { schema: { CategoryTable, PostCategoryTable, PostTable, UserReferencesTable, usersTable } });

async function main() {


  // // Insert user and get ID

  const resultUsers = await db.select().from(usersTable);
  console.log(resultUsers);
  const resultUserReferences = await db.select().from(UserReferencesTable);
  console.log(resultUserReferences);
  const resultPost = await db.select().from(PostTable);
  console.log(resultPost);
  const resultPostCategory = await db.select().from(PostCategoryTable);
  console.log(resultPostCategory);
  const resultCategory = await db.select().from(CategoryTable);
  console.log(resultCategory);


  const queryUser = await db.query.usersTable.findMany({
    with: {
      userReferences: true,
    },
  });
  console.log(queryUser);




  // const [user] = await db.insert(usersTable)
  //   .values({
  //     name: "John Doe",
  //     email: `john.doe${Date.now()}@example.com`,
  //     age: 30,
  //   })
  //   .returning({ id: usersTable.id });

  // await db.insert(UserReferencesTable).values({
  //   userId: user.id,
  //   emailUpdates: true,
  // });

  // // Insert category and get ID
  // const [category] = await db.insert(CategoryTable)
  //   .values({
  //     name: "Category 1",
  //   })
  //   .returning({ id: CategoryTable.id });

  // // Insert post and get ID
  // const [post1] = await db.insert(PostTable)
  //   .values({
  //     title: "Post 1",
  //     content: "Content 1",
  //     authorId: user.id,
  //     averageRating: 0
  //   })
  //   .returning({ id: PostTable.id });

  // await db.insert(PostCategoryTable).values({
  //   postId: post1.id,
  //   categoryId: category.id,
  // });

  // await db.insert(PostTable).values({
  //   title: "Post 2",
  //   content: "Content 2",
  //   authorId: user.id,
  //   averageRating: 0
  // });




}

// async function insertSampleData() {
//   // Create 5 sample users
//   const users = [];
//   for (let i = 1; i <= 5; i++) {
//     const [user] = await db.insert(usersTable)
//       .values({
//         name: `User ${i}`,
//         email: `user${i}${Date.now()}@example.com`,
//         age: 20 + i * 5,
//       })
//       .returning({ id: usersTable.id });
    
//     users.push(user);
    
//     // Add user references for each user
//     await db.insert(UserReferencesTable).values({
//       userId: user.id,
//       emailUpdates: i % 2 === 0, // alternate between true and false
//     });
//   }
  
//   // Create 5 categories
//   const categories = [];
//   for (let i = 1; i <= 5; i++) {
//     const [category] = await db.insert(CategoryTable)
//       .values({
//         name: `Category ${i}`,
//       })
//       .returning({ id: CategoryTable.id });
    
//     categories.push(category);
//   }
  
//   // Create 10 posts with different authors
//   for (let i = 1; i <= 10; i++) {
//     const authorIndex = i % users.length;
//     const [post] = await db.insert(PostTable)
//       .values({
//         title: `Sample Post ${i}`,
//         content: `This is the content for sample post ${i}. It contains some dummy text for testing purposes.`,
//         authorId: users[authorIndex].id,
//         averageRating: Math.random() * 5, // Random rating between 0-5
//       })
//       .returning({ id: PostTable.id });
    
//     // Assign 1-3 random categories to each post
//     const numCategories = Math.floor(Math.random() * 3) + 1;
//     const usedCategoryIndexes = new Set();
    
//     for (let j = 0; j < numCategories; j++) {
//       let categoryIndex;
//       do {
//         categoryIndex = Math.floor(Math.random() * categories.length);
//       } while (usedCategoryIndexes.has(categoryIndex));
      
//       usedCategoryIndexes.add(categoryIndex);
      
//       await db.insert(PostCategoryTable).values({
//         postId: post.id,
//         categoryId: categories[categoryIndex].id,
//       });
//     }
//   }
  
//   console.log("Sample data inserted successfully!");
// }

// Only run main() if this file is executed directly
if (require.main === module) {
  // Change this to insertSampleData() to insert sample data instead
  main()
    .then(() => console.log("Script completed successfully"))
    .catch((err) => console.error("Script failed:", err))
    .finally(() => process.exit(0));
} 

export { db };
