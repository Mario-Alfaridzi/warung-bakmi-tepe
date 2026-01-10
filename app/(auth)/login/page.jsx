"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import InputField from "../../../components/general/InputField";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../lib/redux/api/authApi";

function LoginPage() {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (formData) => {

    try {
      const userData = await dispatch(loginUser(formData)).unwrap();
      console.log("USERDATA", userData);
      toast.success(`Selamat datang, ${userData.username}`);

      if (userData.role === "ADMIN") {
        router.push("/dashboard");
      } else if (userData.role === "KASIR") {
        router.push("/user-menu");
      } else {
        toast.error("Role tidak dikenali.");
      }
    } catch (error) {
      toast.error(error || "Login gagal. Coba lagi.");
    }
  };

  useEffect(() => {
    const cookieData = Cookies.get("user_bakmitepe");
    if (cookieData) {
      const user = JSON.parse(cookieData);
      if (user?.role === "ADMIN") {
        router.push("/dashboard");
      } else if (user?.role === "KASIR") {
        router.push("/user-menu");
      }
    }
  }, []);

  return (
    <div className="flex flex-col  h-screen mb-20">
      <div className="bg-base-200 p-6">
        <Link href="/portal">
          <Image src="/logo-bakmi.png" alt="Logo" width={120} height={40} />
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center gap-6">
        <h3 className="text-4xl mt-8">Login Menu</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] bg-base-200 flex flex-col gap-3 p-6 rounded-md"
        >
          <div className="my-2">
            <InputField
              type="text"
              label="Username"
              id="username"
              placeholder="Masukkan Username"
              {...register("username", { required: "Username wajib diisi" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <InputField
              type="password"
              label="Password"
              id="password"
              placeholder="Masukkan Password"
              {...register("password", { required: "Password wajib diisi" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit bg-base-300 text-base-200 rounded-md"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
