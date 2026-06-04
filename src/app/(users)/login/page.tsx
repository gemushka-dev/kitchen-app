"use client";

import Link from "next/link";
import { useRef } from "react";
import { POST } from "@/src/utils/post.fetch";

import "@/src/app/_styles/register&login.css";

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await POST("/api/auth/login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
    } catch (err: any) {
      alert(err.message);
      console.log(err);
    } finally {
    }
  };

  return (
    <>
      <section className="login">
        <h1 className="login__title">Login</h1>
        <form action="" className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="john.doe@gmail.com"
            className="form__input"
            ref={emailRef}
            required
          />
          <input
            type="password"
            placeholder="securepassword"
            className="form__input"
            ref={passwordRef}
            required
          />

          <button className="form__btn">Login</button>
        </form>
        <div className="login__info">
          <span className="info__text">
            Don't have an account?{" "}
            <Link className="info__link" href="/register">
              Create
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}
