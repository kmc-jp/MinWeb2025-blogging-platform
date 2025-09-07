"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import { ApiError } from "@/lib/types";

export default function AuthPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    intro: "",
    email: "",
    show_email: false,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const nameId = useId();
  const display_nameId = useId();
  const introId = useId();
  const emailId = useId();
  const show_emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = "ユーザー名は必須です";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.name)) {
      newErrors.name = "ユーザー名は英数字のみ使用できます";
    }

    if (!formData.display_name) {
      newErrors.display_name = "表示名は必須です";
    }

    if (!formData.email) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.password) {
      newErrors.password = "パスワードは必須です";
    } else if (formData.password.length < 6) {
      newErrors.password = "パスワードは6文字以上である必要があります";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name: formData.name,
        display_name: formData.display_name,
        intro: formData.intro,
        email: formData.email,
        show_email: formData.show_email,
        password: formData.password, // 注意: 平文送信している
        created_at: new Date().toISOString(),
      };

      const result = await registerUser(userData);

      if (result instanceof ApiError) {
        if (result.message) {
          setApiError(result.message);
        } else {
          setApiError("登録中にエラーが発生しました");
        }
        setIsLoading(false);
        return;
      }

      setSuccessMessage("登録が完了しました！");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("登録エラー:", error);
      setApiError("登録中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">ユーザー登録</h1>

      <div className="mb-6 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
        <p className="text-red-700 font-bold text-center">⚠️ 注意 ⚠️</p>
        <p className="text-red-600 text-sm mt-2">
          このサイトは開発中です。実際に使用しているメールアドレスやパスワードは入力しないでください。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            ユーザー名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={nameId}
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="例: minweb123"
          />
          <p className="text-xs text-gray-500 mt-1">
            英数字のみ使用可能。後から変更できません。
          </p>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="display_name" className="block text-sm font-medium mb-1">
            表示名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={display_nameId}
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.display_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="例: ミン・ウェブ"
          />
          <p className="text-xs text-gray-500 mt-1">絵文字も使用できます (今の所、表示名はどこにも表示されません(?!))</p>
          {errors.display_name && (
            <p className="text-red-500 text-sm mt-1">{errors.display_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="intro" className="block text-sm font-medium mb-1">
            自己紹介
          </label>
          <textarea
            id={introId}
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="そのうちプロフィールに表示されます"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id={emailId}
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="test@minweb.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            テスト用のメールアドレスを使用してください
          </p>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id={show_emailId}
            name="show_email"
            checked={formData.show_email}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="show_email" className="text-sm">
            メールアドレスを公開する
          </label>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            パスワード <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id={passwordId}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="6文字以上"
          />
          <p className="text-xs text-gray-500 mt-1">
            テスト用のパスワードを使用してください
          </p>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            パスワード（確認） <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id={confirmPasswordId}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="パスワードを再入力"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {apiError}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "登録中..." : "登録する"}
        </button>
      </form>
    </div>
  );
}