import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const navigation = useNavigate();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("please select an image first");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("imageUrl", file);

        try {
            const response = await fetch("http://localhost:3000/create-post", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "failed to upload");
            }
            alert("upload successfull");
            console.log("server response", data);

            //reset form
            setFile("");
            setCaption("");
            e.target.reset();
            navigation("/");
        } catch (error) {
            console.error("Error uploaidng", error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="bg-black flex-1">
                {/* <h1>Upload Your Post</h1> */}
                <form
                    className="my-4 flex flex-col gap-4 max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Create New Post
                    </h2>

                    {/* Image Upload Field */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="select-image"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Select Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="select-image"
                            onChange={handleFileChange}
                            className=" w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-gray-300 rounded-lg p-1"
                        />
                    </div>

                    {/* Caption Field */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="caption"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Caption
                        </label>
                        <input
                            type="text"
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            name="caption"
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="What's on your mind?"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all shadow-sm flex items-center justify-center cursor-pointer ${
                            isLoading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]"
                        }`}
                    >
                        {isLoading ? "Uploading..." : "Submit Post"}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Post;
