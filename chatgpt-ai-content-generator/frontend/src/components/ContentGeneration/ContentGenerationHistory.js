import React from "react";
import { FaRegEdit, FaTrashAlt, FaEye, FaPlusSquare } from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import { Link } from "react-router-dom";

const ContentGenerationHistory = () => {
   //get the user profile
   const {isLoading, isError, data, error} = useQuery({
    queryFn: getUserProfileAPI, queryKey: ["profile"]
  });

  //display loading
  if(isLoading){
    return <StatusMessage type="loading" message="Loading please wait..." />
  }
  //display error
  if(isError){
    return <StatusMessage type="error" message={error?.response?.data?.message} />
  }
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Content Generation History
        </h2>
        {/* Button to create new content - functionality to be implemented */}
        <Link
          to="/generate"
          className="mb-4 w-72 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 flex items-center"
        >
          <FaPlusSquare className="mr-2" /> Create New Content
        </Link>
        {/* Content history list */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {data?.user?.contentHistory?.length <= 0 ? <h1>No History Found</h1>:
            <ul className="divide-y divide-gray-200">
              {/* static example list item */}
              {data?.user?.contentHistory?.map((content)=>{
                <ul className="divide-y divide-gray-200">
                {/* Static example list item */}
                <li className="px-6 py-4 flex items-center justify-between space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {content?.content}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(content?.createAt).toLocaleDateString}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Icons for view, edit, and delete actions - functionality to be implemented
                    <FaEye className="text-green-500 hover:text-green-600 cursor-pointer" />
                    <FaRegEdit className="text-blue-500 hover:text-blue-600 cursor-pointer" />
                    <FaTrashAlt className="text-red-500 hover:text-red-600 cursor-pointer" /> */}
                  </div>
                </li>
                {/* Additional list items can be added here */}
              </ul>
              })}
            </ul>

          }
        </div>
      </div>
    </div>
  );
};

export default ContentGenerationHistory;
