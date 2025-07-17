"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../lib/redux/api/authApi";
import Cookies from "js-cookie";

const LoadUserEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = Cookies.get("login");
    if (load) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return null;
};

export default LoadUserEffect;
