"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { FormEvent, useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function ProfileEdit() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const me = await getMe();
          setUser(me);
          setUsername(me.username);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to load user data"
          );
        }
      } else {
        setUsername(user.username);
      }
      setLoading(false);
    };
    fetchUser();
  }, [user, setUser]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!username.trim()) {
        setError("Username cannot be empty");
        return;
      }

      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (loading) return <Loading />;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSave} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
