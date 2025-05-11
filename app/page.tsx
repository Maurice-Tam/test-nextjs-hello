// 'use client';

// import { useEffect, useState } from 'react';

// type Todo = {
//   id: string;
//   todo: string;
// };

// export default function Home() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/api/todos')
//       .then(async (res) => {
//         const rawText = await res.text(); // Get the raw response text
//         console.log('Raw response from API:', rawText); // Log the raw response

//         // Try parsing the response text
//         try {
//           const data: Todo[] = JSON.parse(rawText); // Only parse once
//           setTodos(data);
//         } catch (error) {
//           console.error('Error parsing response:', error);
//         } finally {
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching todos:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <main className="p-6 font-sans">
//       <h1 className="text-2xl font-bold mb-4">Hello World from Next.js!</h1>
//       <h2 className="text-xl mb-2">Todo List:</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="list-disc pl-5">
//           {todos.map((todo) => (
//             <li key={todo.id}>{todo.todo}</li>  
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

type Learner = {
  id: number;
  attributes: {
    firstName: string;
    lastName: string;
    email: string;
    utorid: string;
    cohortCode: string;
    imageLink: string | null;
  };
  relationships: {
    groups: {
      data: {
        id: number;
        type: string;
        attributes: {
          name: string;
        };
      }[];
    };
    assignedScholars: {
      data: {
        id: string;
        type: string;
        attributes: {
          firstName: string;
          lastName: string;
          email: string;
          utorid: string;
        };
      }[];
    };
    learnerSupporters: {
      data: any[];
    };
  };
};

export default function Home() {
  const [learners, setLearners] = useState<Learner[]>([]);

  useEffect(() => {
    fetch('/api/learners')
      .then((res) => res.json())
      .then((data) => setLearners(data.data))
      .catch((err) => console.error('Error fetching learners:', err));
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Learners</h1>
      <div className="space-y-6">
        {learners.map((learner) => (
          <div
            key={learner.id}
            className="p-4 border rounded-lg shadow flex items-start gap-4"
          >
            {/* <img
              src={
                learner.attributes.imageLink ||
                'https://ui-avatars.com/api/?name=' +
                  encodeURIComponent(
                    `${learner.attributes.firstName} ${learner.attributes.lastName}`
                  )
              }
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border"
            /> */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {learner.attributes.firstName} {learner.attributes.lastName}
              </h2>
              <p className="text-gray-600 text-sm">{learner.attributes.email}</p>
              <p className="text-gray-600 text-sm">UTORid: {learner.attributes.utorid}</p>
              <p className="text-gray-600 text-sm">Cohort: {learner.attributes.cohortCode}</p>

              <div className="mt-2">
                {learner.relationships.groups?.data.map((group) => (
                  <span
                    key={group.id}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                  >
                    {group.attributes.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-sm text-gray-700">
                {learner.relationships.assignedScholars?.data.map((scholar) => (
                  <div key={scholar.id}>
                    <strong>Scholar:</strong> {scholar.attributes.firstName}{' '}
                    {scholar.attributes.lastName} (
                    <span className="text-blue-700">{scholar.attributes.email}</span>)
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}