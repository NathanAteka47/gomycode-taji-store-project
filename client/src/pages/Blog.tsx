const posts = [
  {
    title: "How to Prepare for Post-Surgery Recovery at Home",
    date: "July 2025",
    summary: "Tips on setting up your space and selecting the right care level.",
    image: "/blog1.jpg",
  },
  {
    title: "Caring for Elderly Loved Ones: Home vs Hospital",
    date: "June 2025",
    summary: "Why homely environments often support better recovery.",
    image: "/blog2.jpg",
  },
];

const Blog = () => {
  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Health & Recovery Tips</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {post.image && (
                <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-800 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                <p className="text-gray-700 mb-4">{post.summary}</p>
                <a
                  href="#"
                  className="text-blue-700 hover:text-blue-900 font-medium text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
