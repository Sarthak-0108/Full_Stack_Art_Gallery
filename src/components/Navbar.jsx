import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="">
            <nav className="bg-slate-900 text-white font-mono font-semibold flex justify-between px-4 h-7 p-0.5">
                <h1>Sarthak's Art Gallery</h1>
                <div className="nav flex">
                    <Link
                        to={"/create-post"}
                        className="px-4 hover:text-sky-600"
                    >
                        create-post
                    </Link>
                    <Link to={"/"} className="hover:text-sky-600">
                        feed
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
