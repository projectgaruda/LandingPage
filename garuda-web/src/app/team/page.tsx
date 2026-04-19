import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the passionate engineers, designers, and strategists behind GARUDA's world-class super mileage vehicles.",
};

const departments = [
  {
    name: "Management",
    members: [
      { name: "Arjun Sharma", usn: "1RV21ME001", position: "Team Captain", avatar: "AS" },
      { name: "Priya Nair", usn: "1RV21ME012", position: "Deputy Captain", avatar: "PN" },
      { name: "Kiran Reddy", usn: "1RV21ME023", position: "Finance Lead", avatar: "KR" },
    ],
  },
  {
    name: "Mechanical",
    members: [
      { name: "Rohit Kumar", usn: "1RV21ME034", position: "Chassis Lead", avatar: "RK" },
      { name: "Anjali Iyer", usn: "1RV21ME045", position: "Suspension Engineer", avatar: "AI" },
      { name: "Suresh Babu", usn: "1RV21ME056", position: "Powertrain Engineer", avatar: "SB" },
      { name: "Meera Patel", usn: "1RV21ME067", position: "Manufacturing Lead", avatar: "MP" },
    ],
  },
  {
    name: "Aerodynamics",
    members: [
      { name: "Vikram Singh", usn: "1RV21ME078", position: "Aero Lead", avatar: "VS" },
      { name: "Divya Menon", usn: "1RV21ME089", position: "CFD Analyst", avatar: "DM" },
      { name: "Aditya Rao", usn: "1RV21ME090", position: "Body Design", avatar: "AR" },
    ],
  },
  {
    name: "Electronics & Software",
    members: [
      { name: "Rahul Gupta", usn: "1RV21EC001", position: "Electronics Lead", avatar: "RG" },
      { name: "Sneha Joshi", usn: "1RV21EC012", position: "Embedded Systems", avatar: "SJ" },
      { name: "Tarun Mishra", usn: "1RV21EC023", position: "Data Acquisition", avatar: "TM" },
    ],
  },
];

export default function TeamPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">The People</div>
          <h1 className={styles.pageTitle}>
            Meet Our <span className={styles.accent}>Team</span>
          </h1>
          <p className={styles.pageDesc}>
            Multidisciplinary, driven, and united by a shared passion for engineering 
            excellence. Every build is a team effort.
          </p>
        </div>
      </section>

      {/* Team Departments */}
      <section className="section">
        <div className="container">
          {departments.map((dept) => (
            <div key={dept.name} className={styles.deptSection}>
              <div className={styles.deptHeader}>
                <div className={styles.deptLine} />
                <h2 className={styles.deptName}>{dept.name}</h2>
                <div className={styles.deptLine} />
              </div>
              <div className={styles.membersGrid}>
                {dept.members.map((member) => (
                  <div key={member.usn} className={`card ${styles.memberCard}`}>
                    <div className={styles.avatar}>
                      <span className={styles.avatarText}>{member.avatar}</span>
                      <div className={styles.avatarRing} />
                    </div>
                    <div className={styles.memberInfo}>
                      <h3 className={styles.memberName}>{member.name}</h3>
                      <div className={styles.memberPosition}>{member.position}</div>
                      <div className={styles.memberUsn}>{member.usn}</div>
                    </div>
                    <div className={styles.memberDept}>{dept.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
