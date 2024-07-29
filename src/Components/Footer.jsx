import React from "react";
import { IoLogoGithub } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  const gitUrl= "https://github.com/harsh5979";
  const twitterUrl = "https://twitter.com/HarshPr5979";
  const  linkedinUrl="https://www.linkedin.com/in/harsh-prajapati-a2089025b/";
  const instaUrl ="https://www.instagram.com/harshprajapati_5979?utm_source=qr&igsh=MWVmMzFnM2ZmNmdqeQ==";
  return (
    <>
      <div className="">
        <footer className="bg-gray-800 text-white py-3  w-full md:h-20 h-[110px] justify-center  relative bottom-0">
          <div className="md:flex justify-around ">
            <h3 className="text-center my-1 select-none content-center ">
              Designed and Developed by Harsh & Resmit.
            </h3>
            <div className=" flex justify-center mb-1 items-center my-3">
              &copy; 2024 HP✨.  All Rights Reserved.
            </div>
            <ul className="flex gap-5 justify-center content-center my-2 items-center ">
              <li className="flex  ">
                <a href={gitUrl} target="_blank" className="removeLinkHover text-white">
                  <IoLogoGithub />
                </a>
              </li>

              <li className="flex">
                <a href={twitterUrl} target="_blank" className="removeLinkHover text-white">
                  <FaTwitter />
                </a>
              </li>
              <li className="flex">
                <a href={linkedinUrl }target="_blank"className="removeLinkHover text-white">
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="flex">
                <a href={instaUrl}target="_blank" className="removeLinkHover text-white">
                  <RiInstagramFill />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
