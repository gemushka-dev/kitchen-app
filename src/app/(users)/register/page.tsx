"use client";

import Link from "next/link";
import { useRef } from "react";
import { POST } from "@/src/utils/post.fetch";

import "@/src/app/_styles/register&login.css";

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await POST("/api/auth/register", {
        username: usernameRef.current?.value,
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
      <section className="register" onSubmit={handleSubmit}>
        <h1 className="register__title">Register</h1>
        <form action="" className="register__form">
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
          <input
            type="text"
            placeholder="JohnDoe"
            className="form__input"
            ref={usernameRef}
            required
          />
          <button className="form__btn">Register</button>
        </form>
        <div className="register__info">
          <span className="info__text">
            Already have an account?{" "}
            <Link className="info__link" href="/login">
              Login
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}
