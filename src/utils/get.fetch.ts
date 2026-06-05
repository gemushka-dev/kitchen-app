export async function GET(url: string) {
  const response = await fetch(url, { method: "GET", credentials: "include" });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(response);
    return alert(errorData.error || "Something went wrong");
  }
  const data = await response.json();
  return data;
}
