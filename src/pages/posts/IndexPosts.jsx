import { useEffect, useState } from 'react';

function IndexPosts() {
   const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('publish')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('https://golang-blog-production-ecd0.up.railway.app/article/100/0?status='+status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [status]);

  const setDeletePost = async (id) => {
    try {
      const response = await fetch('https://golang-blog-production-ecd0.up.railway.app/article/'+id, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify([])
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setStatus('thrash')
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className='w-10/12'>
            {error && <p className="mb-4">{error}</p>}
          <div>
              <button   onClick={() => setStatus("publish")}>Publish</button>
              <button   onClick={() => setStatus("draft")}>Draft</button>
              <button   onClick={() => setStatus("thrash")}>Thrash</button>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-red-300">Posts {status}</h1>
            <a href='/create'>Create</a>
          </div>
          <table className="table-auto border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Content</th>
                <th className="border px-4 py-2">Categories</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {post.length > 0 && (
                post.map((items, index) => (
                  <tr key={'post' + index}>
                    <td className="border px-4 py-2">{items.ID}</td>
                    <td className="border px-4 py-2">{items.Title}</td>
                    <td className="border px-4 py-2">{items.Content}</td>
                    <td className="border px-4 py-2">{items.Category}</td>
                    <td className="border px-4 py-2">{items.Status}</td>
                    <td className="border px-4 py-2 flex items-center justify-center">
                        <a href={'edit/'+items.ID}>Edit</a>
                        <button type='button' onClick={() => setDeletePost(items.ID)} style={{ paddingLeft: "10px", background:'transparent', color:'blue', border:'none' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}

              {post.length == 0 && (
                <tr key={'post'}>
                  <td colSpan={5}>No data</td>
                </tr>
              )}
              
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default IndexPosts;
