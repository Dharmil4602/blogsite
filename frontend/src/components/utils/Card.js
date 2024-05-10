function Card({ post }) {
    return (
        <div className="bg-white shadow-md rounded-md p-4">
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
          <p className="text-gray-600">Author: {post.author}</p>
          <p className="text-gray-500 text-sm">Date Created: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
     );
}

export default Card