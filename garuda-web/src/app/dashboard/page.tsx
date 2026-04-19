import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch student details, position, and tasks
  const student = await prisma.student.findUnique({
    where: { usn: session.user.email as string },
    include: {
      tasks: {
        orderBy: {
          deadline: "asc",
        },
      },
    },
  });

  if (!student) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={`card ${styles.errorCard}`}>
            <h2>Student Record Not Found</h2>
            <p>Please contact your team lead to set up your profile.</p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Group tasks by month
  const tasksByMonth: { [key: string]: typeof student.tasks } = {};
  student.tasks.forEach((task) => {
    if (!tasksByMonth[task.month]) {
      tasksByMonth[task.month] = [];
    }
    tasksByMonth[task.month].push(task);
  });

  const months = Object.keys(tasksByMonth);

  return (
    <div className={styles.page}>
      <div className={styles.headerGlow} />
      <div className="container">
        <div className={styles.dashboardHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>
              {student.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h1 className={styles.welcome}>Welcome, {student.name}</h1>
              <div className={styles.usnLabel}>{student.usn}</div>
            </div>
          </div>
          
          <div className={styles.positionCard}>
            <div className={styles.posLabel}>Position in Club</div>
            <div className={styles.posValue}>{student.position}</div>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Main Work Area */}
          <div className={styles.mainContent}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Work Assigned</h2>
              <div className={styles.taskCount}>{student.tasks.length} Active Tasks</div>
            </div>

            {months.length > 0 ? (
              months.map((month) => (
                <div key={month} className={styles.monthSection}>
                  <h3 className={styles.monthTitle}>{month}</h3>
                  <div className={styles.taskList}>
                    {tasksByMonth[month].map((task) => (
                      <div key={task.id} className={`card ${styles.taskCard}`}>
                        <div className={styles.taskHeader}>
                          <h4 className={styles.taskTitle}>{task.title}</h4>
                          <span className={`${styles.statusBadge} status-${task.status.replace(" ", "-")}`}>
                            {task.status}
                          </span>
                        </div>
                        <p className={styles.taskDesc}>{task.description}</p>
                        <div className={styles.taskFooter}>
                          <div className={styles.deadlineInfo}>
                            <span className={styles.deadlineLabel}>Deadline:</span>
                            <span className={styles.deadlineDate}>
                              {new Date(task.deadline).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={`card ${styles.noTasksCard}`}>
                <p>No work has been assigned to you yet. Lucky you!</p>
              </div>
            )}
          </div>

          {/* Sidebar / Stats */}
          <div className={styles.sidebar}>
            <div className={`card ${styles.statsCard}`}>
              <h3 className={styles.sidebarTitle}>Overview</h3>
              <div className={styles.statItem}>
                <span>Completed Tasks</span>
                <span className={styles.statVal}>{student.tasks.filter(t => t.status === "done").length}</span>
              </div>
              <div className={styles.statItem}>
                <span>Pending Tasks</span>
                <span className={styles.statVal}>{student.tasks.filter(t => t.status === "pending").length}</span>
              </div>
              <div className={styles.statItem}>
                <span>In Progress</span>
                <span className={styles.statVal}>{student.tasks.filter(t => t.status === "in progress").length}</span>
              </div>
            </div>

            <div className={`card ${styles.announcementCard}`}>
              <h3 className={styles.sidebarTitle}>Club Announcements</h3>
              <p className={styles.announcementText}>Next team meet: Monday at 5:00 PM in the mechanical shed. Attendance mandatory for all aero members.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
