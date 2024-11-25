import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Lesson.css';

const Lesson = () => {
  const { id } = useParams<{ id: string }>();

  const lessonContent = {
    1: {
      title: 'Breakers',
      pages: [
        { 
          id: 1, 
          title: 'Introduction to Circuit Breakers', 
          content: 'Understand the purpose and importance of circuit breakers in electrical systems. Learn about their role in protecting circuits from overcurrent and short circuits.' 
        },
        { 
          id: 2, 
          title: 'History and Evolution of Circuit Breakers', 
          content: 'Explore the historical development of circuit breakers, from early fuse-based systems to modern smart breakers.' 
        },
        { 
          id: 3, 
          title: 'Types of Circuit Breakers', 
          content: 'Delve into the different types of circuit breakers, including Miniature Circuit Breakers (MCBs), Molded Case Circuit Breakers (MCCBs), Air Circuit Breakers (ACBs), and Vacuum Circuit Breakers (VCBs). Understand their applications and advantages.' 
        },
        { 
          id: 4, 
          title: 'How Circuit Breakers Work', 
          content: 'Learn the principles of operation behind circuit breakers, including thermal-magnetic operation, arc extinguishing, and trip mechanisms.' 
        },
        { 
          id: 5, 
          title: 'Sizing and Selecting Circuit Breakers', 
          content: 'Understand the factors involved in sizing circuit breakers, including load calculations, voltage ratings, and short circuit capacity. Learn how to select the right breaker for specific applications.' 
        },
        { 
          id: 6, 
          title: 'Installation Best Practices', 
          content: 'Review best practices for installing circuit breakers, including safety considerations, wiring guidelines, and proper positioning in panels or switchgear.' 
        },
        { 
          id: 7, 
          title: 'Breaker Coordination and Protection', 
          content: 'Learn about selective coordination and protection in electrical systems to ensure reliability and safety. Understand how to achieve cascading and discrimination.' 
        },
        { 
          id: 8, 
          title: 'Breaker Testing and Inspection', 
          content: 'Explore the testing and inspection methods for circuit breakers, including insulation resistance tests, trip tests, and routine maintenance inspections.' 
        },
        { 
          id: 9, 
          title: 'Troubleshooting Circuit Breakers', 
          content: 'Understand common circuit breaker issues such as nuisance tripping, overheating, and mechanical failures. Learn systematic troubleshooting techniques.' 
        },
        { 
          id: 10, 
          title: 'Smart and Digital Circuit Breakers', 
          content: 'Discover the advancements in circuit breaker technology, including smart breakers with IoT connectivity, real-time monitoring, and predictive maintenance capabilities.' 
        },
        { 
          id: 11, 
          title: 'Breaker Maintenance and Lifecycle Management', 
          content: 'Understand the lifecycle of circuit breakers, including preventive and predictive maintenance strategies to extend their operational life and ensure reliability.' 
        },
        { 
          id: 12, 
          title: 'Case Studies and Real-World Applications', 
          content: 'Examine real-world case studies where circuit breakers played a critical role in industrial and commercial settings. Learn lessons from failures and successes.' 
        },
        { 
          id: 13, 
          title: 'Course Summary and Final Assessment', 
          content: 'Review key concepts covered in the course and take a final assessment to validate your knowledge.' 
        },
        { 
          id: 14, 
          title: 'Course Completion', 
          content: 'Congratulations on completing the course! Reflect on what you’ve learned and explore next steps for further development.' 
        },
      ],
    },
    2: {
      title: 'Industrial Wiring',
      pages: [
        { id: 1, title: 'Basics of Industrial Wiring', content: 'Learn the fundamentals of wiring in industrial systems.' },
        { id: 2, title: 'Wiring Standards', content: 'Understand the standards and safety procedures for industrial wiring.' },
        { id: 3, title: 'Wiring Tools', content: 'Explore the tools needed for effective industrial wiring.' },
      ],
    },
    3: {
      title: 'Advanced Circuit Analysis',
      pages: [
        { id: 1, title: 'Introduction to Circuits', content: 'Dive into the fundamentals of circuit analysis.' },
        { id: 2, title: 'Complex Circuits', content: 'Learn how to analyze complex electrical circuits.' },
        { id: 3, title: 'Practical Applications', content: 'Understand practical applications of advanced circuit analysis.' },
      ],
    },
    4: {
      title: 'Electrical Safety',
      pages: [
        { id: 1, title: 'Electrical Safety Overview', content: 'Understand essential electrical safety standards.' },
        { id: 2, title: 'PPE for Electricians', content: 'Learn about personal protective equipment for electricians.' },
        { id: 3, title: 'Safety Procedures', content: 'Explore safe work procedures when handling electricity.' },
      ],
    },
    5: {
      title: 'Renewable Energy Systems',
      pages: [
        { id: 1, title: 'Solar Energy Basics', content: 'Explore the basics of solar energy systems.' },
        { id: 2, title: 'Wind Energy Basics', content: 'Understand how wind energy systems work.' },
        { id: 3, title: 'Energy Storage', content: 'Learn about energy storage solutions for renewable systems.' },
      ],
    },
  };

  const numericId = Number(id);
  const lesson = lessonContent[numericId as keyof typeof lessonContent];

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);
  const [completedPages, setCompletedPages] = useState<number[]>([]);
  if (!lesson) {
    return <p>Lesson not found.</p>;
  }

  const handleNext = () => {
    if (currentPage < lesson.pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
      setCompletedPages((prev) => [...new Set([...prev, currentPage])]); //mark current page as complete
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (index: number) => {
    if(index <= currentPage || completedPages.includes(index)){
        setCurrentPage(index);
    }
  };

  return (
    <div className="lesson-container">
      {/* Lesson Progress Tracker */}
      <aside className="lesson-progress">
        <h3>Lesson Progress</h3>
        <ul>
          {lesson.pages.map((page, index) => (
            <li
              key={page.id}
              className={index === currentPage ? 'active' : completedPages.includes(index) ? 'completed' : 'locked'}
              onClick={() => handlePageClick(index)}
              style={{ cursor: index <= currentPage || completedPages.includes(index) ? 'pointer' : 'not-allowed' }}
            >
              {page.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Lesson Content */}
      <div className="lesson-content">
        <h1>{lesson.pages[currentPage].title}</h1>
        <p>{lesson.pages[currentPage].content}</p>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={currentPage === lesson.pages.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson;