import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "src/components/Dropdowns/NotificationsDropdown";
import UserDropdown from "src/components/Dropdowns/Userdropdown";
import {
  HiOutlineBackspace,
  HiOutlineLogin,
  HiOutlineViewGrid,
  HiOutlineChat,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useCookies } from "react-cookie";

export default function UserSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [cookie] = useCookies(["user"]);
  const router = useRouter();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-[#18344D] flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="cib-next-js"></i>
          </button>
          {/* Brand */}
          <Link href="/pages/user/">
            <i className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              Dashboard
            </i>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/pages/user/">
                    <i className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      Dashboard
                    </i>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/pages/user/">
                  <i
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/pages/user") !== -1
                        ? "text-white hover:text-lightBlue-600"
                        : "text-white hover:text-blueGray-500")
                    }
                  >
                    <HiOutlineViewGrid className="items-center inline-flex h-5 w-5 m-2" />
                    Overview
                  </i>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/pages/user/counslorsList">
                  <i
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/pages/user/counslorsList") !==
                      -1
                        ? "text-white hover:text-lightBlue-600"
                        : "text-white hover:text-blueGray-500")
                    }
                  >
                    <HiOutlineUserCircle className="items-center inline-flex h-5 w-5 m-2" />
                    Bookings
                  </i>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/pages/user/myBookings">
                  <i
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/pages/user/myBookings") !== -1
                        ? "text-white hover:text-lightBlue-600"
                        : "text-white hover:text-blueGray-500")
                    }
                  >
                    <HiOutlineChat className="items-center inline-flex h-5 w-5 m-2" />
                    My Bookings
                  </i>
                </Link>
              </li>
            </ul>

            {/* Navigation */}

            {cookie.user ? (
              <div> </div>
            ) : (
              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="items-center">
                  <Link href="/login">
                    <i className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                      <HiOutlineLogin className="items-center inline-flex h-5 w-5 m-2" />
                      Login
                    </i>
                  </Link>
                </li>

                <li className="items-center">
                  <Link href="/register">
                    <i className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                      <HiOutlineUserCircle className="items-center inline-flex h-5 w-5 m-2" />
                      Register
                    </i>
                  </Link>
                </li>
              </ul>
            )}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/">
                  <i className="text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    <HiOutlineBackspace className="items-center inline-flex h-5 w-5 m-2" />
                    Return to Landing Page
                  </i>
                </Link>
              </li>
            </ul>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4"></ul>
          </div>
        </div>
      </nav>
    </>
  );
}