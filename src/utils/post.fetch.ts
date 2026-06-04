export async function POST(url: string, body: object) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(response);
    return alert(errorData.error || "Something went wrong");
  }
  const data = await response.json();
  alert(data.message);
}
