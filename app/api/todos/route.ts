// app/api/todos/route.ts

export async function GET() {
  const response = await fetch('https://sqliteapi.onrender.com/gettodos');

  if (!response.ok) {
    return new Response('Failed to fetch todos', { status: 500 });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

