import { db } from '@/db';
import { usersTable, UserReferencesTable, PostTable, CategoryTable, PostCategoryTable } from '@/db/schema';

// Since this is a server component, we can fetch data directly
async function getData() {
  const users = await db.select().from(usersTable);
  const userReferences = await db.select().from(UserReferencesTable);
  const posts = await db.select().from(PostTable);
  const categories = await db.select().from(CategoryTable);
  const postCategories = await db.select().from(PostCategoryTable);

  return {
    users,
    userReferences,
    posts,
    categories,
    postCategories
  };
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Database Content</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Users ({data.users.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-gray-200">
            <thead>
              <tr className="bg-black-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Age</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">User References ({data.userReferences.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-gray-200">
            <thead>
              <tr className="bg-black-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">User ID</th>
                <th className="px-4 py-2 border">Email Updates</th>
              </tr>
            </thead>
            <tbody>
              {data.userReferences.map(ref => (
                <tr key={ref.id}>
                  <td className="px-4 py-2 border">{ref.id}</td>
                  <td className="px-4 py-2 border">{ref.userId}</td>
                  <td className="px-4 py-2 border">{ref.emailUpdates ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Posts ({data.posts.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-gray-200">
            <thead>
              <tr className="bg-black-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Content</th>
                <th className="px-4 py-2 border">Author ID</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Created</th>
                <th className="px-4 py-2 border">Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map(post => (
                <tr key={post.id}>
                  <td className="px-4 py-2 border">{post.id}</td>
                  <td className="px-4 py-2 border">{post.title}</td>
                  <td className="px-4 py-2 border">
                    <div className="max-w-xs truncate">{post.content}</div>
                  </td>
                  <td className="px-4 py-2 border">{post.authorId}</td>
                  <td className="px-4 py-2 border">{post.averageRating.toFixed(1)}</td>
                  <td className="px-4 py-2 border">{post.createdAt.toLocaleString()}</td>
                  <td className="px-4 py-2 border">{post.updatedAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Categories ({data.categories.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-gray-200">
            <thead>
              <tr className="bg-black-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {data.categories.map(category => (
                <tr key={category.id}>
                  <td className="px-4 py-2 border">{category.id}</td>
                  <td className="px-4 py-2 border">{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Post Categories ({data.postCategories.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-gray-200">
            <thead>
              <tr className="bg-black-100">
                <th className="px-4 py-2 border">Post ID</th>
                <th className="px-4 py-2 border">Category ID</th>
              </tr>
            </thead>
            <tbody>
              {data.postCategories.map((pc, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{pc.postId}</td>
                  <td className="px-4 py-2 border">{pc.categoryId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
