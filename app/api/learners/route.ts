// app/api/learners/route.ts

export async function GET() {
    try {
      const response = await fetch('https://learnerchart.uat.medicine.utoronto.ca/appl/learners', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed:
          // 'Authorization': 'Bearer YOUR_TOKEN',
        },
      });
  
      const rawText = await response.text();
  
      try {
        const json = JSON.parse(rawText);
        return new Response(JSON.stringify(json));
      } catch (parseError) {
        console.error('Failed to parse learner data:', parseError);
        return new Response('Invalid JSON from learner API', { status: 502 });
      }
    } catch (error) {
      console.error('Error fetching learners:', error);
      return new Response('Failed to fetch learner data', { status: 500 });
    }
  }