import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../api";
import { api } from "@/app/api/api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await api.post("/auth/login", body);
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      const response = NextResponse.json(apiRes.data);

      for (const cookieStr of cookieArray) {
        response.headers.append("Set-Cookie", cookieStr);
      }

      return response;
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message ?? "Login failed",
      },
      { status: err.response?.status ?? 500 }
    );
  }
}
