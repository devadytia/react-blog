import { useState } from "react";

function CreatePosts() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    status: ""
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitWithStatus = async (statusValue) => {
      await handleSubmit(statusValue);
  };

  const handleSubmit = async (statusValue) => {
    const payload = { ...formData, status: statusValue };

    try {
      const response = await fetch("https://golang-blog-production-ecd0.up.railway.app/article", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error) {
          setErrors(data.error);
        } else {
          setErrors([data.message || "Terjadi kesalahan"]);
        }
        return;
      }
     
      setMessage("Post berhasil diupdate!");
      setErrors([]);
      setFormData({
        title: "",
        content: "",
        category: "",
        status: ""
      });
    } catch (error) {
       setErrors([err.message]);
    }
  };

  return (
     <div className="flex items-center justify-center">
      <div className='w-10/12'>
        <h1 className="text-2xl text-red-300 mb-5">Create Post</h1>

        {message && <p className="mb-4">{message}</p>}

        {errors.length > 0 && (
          <div style={{ color: "red", marginTop: "1rem" }}>
            {errors.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}

        <form  className="space-y-4 mt-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border px-3 py-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border px-3 py-2 w-full"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border px-3 py-2 w-full"
            />
          </div>


          <div className="flex items-center justify-end mt-4" style={{ marginTop:20 }}>
            <a href="/"
                className="bg-red-300 text-white px-4 py-2 rounded"
                style={{ background:'blue', color:'white',  marginRight:5, padding:4, textDecoration:'none' }}
              >
                Back
            </a>
            <button
              type="button"
              className="bg-red-300 text-white px-4 py-2 rounded"
              onClick={() => handleSubmitWithStatus("draft")}
              style={{ background:'red', color:'white', marginRight:5 }}
            >
              Draft
            </button>
            <button
              type="button"
               onClick={() => handleSubmitWithStatus("publish")}
              className="bg-red-300 text-white px-4 py-2 rounded"
               style={{ background:'blue', color:'white' }}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePosts;
