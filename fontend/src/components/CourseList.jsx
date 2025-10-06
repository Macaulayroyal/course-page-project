import React from 'react';

const sampleCourses = [
  { id: 1, title: "React Basics", description: "Learn the basics of React." },
  { id: 2, title: "Advanced React", description: "Dive deeper into React hooks and context." },
  { id: 3, title: "React and Redux", description: "Manage state with Redux in React apps." },
];

function CourseList() {
  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {sampleCourses.map(course => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
