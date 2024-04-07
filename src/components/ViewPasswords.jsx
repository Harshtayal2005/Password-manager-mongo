import React from "react";
import { IoCopy } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewPasswords = ({ passwordArray, deletePassword, editPassword }) => {
  const copyText = (text) => {
    toast("Copied To clipboard", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* to apple rounded on a table, overflow must be hidden */}
      <div className="overflow-auto">
        <table className="table-auto w-full rounded-lg overflow-hidden">
          <thead className="bg-green-700 text-white text-[1.2rem]">
            <tr>
              <th className="py-2">Site</th>
              <th className="py-2">Username</th>
              <th className="py-2">Passwords</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {passwordArray.map((items, index) => (
              <tr key={index}>
                <td className="border border-white py-3 text-center whitespace-normal">
                  <div className="flex justify-center items-center gap-1">
                    <a href={items.site} target="_blank">
                      {items.site}
                    </a>
                    {items.site !== "" && (
                      <IoCopy
                        className="hover:cursor-pointer"
                        onClick={() => copyText(items.site)}
                      />
                    )}
                    {items.site === "" && <div>NA</div>}
                  </div>
                </td>
                <td className="border border-white py-3 text-center whitespace-normal">
                  <div className="flex justify-center items-center gap-1">
                    {items.username}
                    {items.username !== "" && (
                      <IoCopy
                        className="hover:cursor-pointer"
                        onClick={() => copyText(items.username)}
                      />
                    )}
                    {items.username === "" && <div>NA</div>}
                  </div>
                </td>
                <td className="border border-white py-3 text-center whitespace-normal">
                  <div className="flex justify-center items-center gap-1">
                    {items.password !== "" && "*".repeat(5)}
                    {items.password !== "" && (
                      <IoCopy
                        className="hover:cursor-pointer"
                        onClick={() => copyText(items.password)}
                      />
                    )}
                    {items.password === "" && <div>NA</div>}
                  </div>
                </td>

                <td className="border border-white py-3 text-center whitespace-normal">
                  <div className="flex justify-center items-center gap-2">
                    <MdEdit
                      size={24}
                      className="hover:cursor-pointer"
                      onClick={() => editPassword(items.id)}
                    />
                    <MdDelete
                      size={24}
                      className="hover:cursor-pointer"
                      onClick={() => deletePassword(items.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewPasswords;
